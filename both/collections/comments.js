Comments = new Mongo.Collection('comments');

Comments.helpers({
  author: function () {
    return Meteor.users.findOne({_id: this.userId});
  },
  upvotes: function() {
    return Meteor.users.find({_id: {$in: this.upvoterIds}}).count();
  },
  downvotes: function() {
    return Meteor.users.find({_id: {$in: this.downvoterIds}}).count();
  },
});

// Howon: attempt to make code more modular. Not sure if this is the right way
// you define local function blocks in Meteor
var _notifyCommentAuthors = function (postId, postAuthorId, user) {
  var comments = Comments.find({postId: postId}).fetch();
  var authorIds = _.uniq(_.pluck(comments, 'userId'));

  // OP and myself shouldn't be notified
  authorIds = _.filter(authorIds, function (authorId) {
    return ((authorId != postAuthorId) && (authorId != user._id)) 
  });

  // notify comment authors
  _.each(authorIds, function (authorId) {
    Meteor.call("addNotification", {
      fromUserId: user._id,
      toUserId: authorId,
      postId: postId,
      commentId: null,
      body: "Someone also commented on the toast!",
      icon: "ios-chatbubble",
      type: "comment"
    });
  });
}

Meteor.methods({
  "Comments.new": function (postId, commentBody, userId) {
    var user;

    if (userId) {
      user = Meteor.users.findOne({_id: userId});
    } else {
      Meteor.users.findOne({_id: this.userId});
    }

    var post = Posts.findOne({_id: postId});
    var postAuthorId = post.userId;
    var isOP = post.userId === user._id;
    var nameTag = "";
    var myExistingComment = Comments.findOne({userId: user._id, postId: postId});

    // Determine my anonymous nametag
    if (isOP) {
      nameTag = "OP";
    } else if (myExistingComment) {
      nameTag = prevComment.nameTag;
    } else {
      nameTag = Utils.getNameTag();
    }

    return Comments.insert({
      postId: postId,
      body: commentBody,
      userId: user._id,
      networkId: user.networkId,
      nameTag: nameTag,
      upvoterIds: [],
      downvoterIds: [],
      numLikes: 0,
      createdAt: new Date(),
    }, function () {

      // send this noti to the author of original post
      // if I am not the OP
      Meteor.call("addNotification", {
        fromUserId: user._id,
        toUserId: postAuthorId,
        postId: postId,
        body: "Someone commented on your toast!",
        icon: "ios-chatbubble",
        type: "comment"
      });
    });
  },

  // "Comments.new": function (info, userId) {
  //   var user;

  //   if (userId) {
  //     user = Meteor.users.findOne({_id: userId});
  //   } else {
  //     Meteor.users.findOne({_id: this.userId});
  //   }

  //   var authorId = info.authorId; // owner of the post that I am commenting on
  //   var nameTag = "";
  //   var postId = info.postId;
  //   var post = Posts.findOne({_id: postId});
  //   var isOP = post.userId === this.userId;
  //   var prevComment = Comments.findOne({userId: this.userId, postId: postId});
  //   if (isOP) {
  //     nameTag = "OP";
  //   } else if (prevComment) {
  //     nameTag = prevComment.nameTag;
  //   } else {
  //     nameTag = Utils.getNameTag();
  //   }

  //   Comments.insert({
  //     postId: postId,
  //     body: info.body,
  //     userId: this.userId,
  //     networkId: user.networkId,
  //     nameTag: nameTag,
  //     upvoterIds: [],
  //     downvoterIds: [],
  //     numLikes: 0,
  //     createdAt: new Date(),
  //   }, function () {

  //     // var author = Meteor.users.findOne({_id: authorId});
  //     // var incAuthor = Math.floor(Math.random() * (7 - 2)) + 2; // random int between 2 and 6
  //     // var incCommenter = Math.floor(Math.random() * (7 - 2)) + 2;
  //     // // console.log("incAuthor", incAuthor);
  //     // // console.log("incCommenter", incCommenter);
  //     // Meteor.call("Users.setRep", authorId, author.rep+incAuthor);
  //     // Meteor.call("Users.setRep", user._id, user.rep+incCommenter);

  //     // // Notify people who also commented on this post
  //     // _notifyCommentAuthors(postId, post.userId, user);

  //     // send this noti to the author of original post
  //     // if I am not the OP
  //     Meteor.call("addNotification", {
  //       fromUserId: user._id,
  //       toUserId: authorId,
  //       postId: info.postId,
  //       // commentId: info._id,
  //       commentId: null, // making this null for now
  //       body: "Someone commented on your toast!",
  //       icon: "ios-chatbubble",
  //       type: "comment"
  //     });
  //   });
  // },

  'Comments.delete': function (commentId) {
    Comments.remove({
      _id: commentId
    });
    Notifications.remove({
      commentId: commentId
    });
  },

  'Comments.decreaseNumLikes': function (commentId) {
    var comment = Comments.findOne({
      _id: commentId
    });
    if (comment) {
      console.log("decreasing comment's numlikes");
      var numLikes = Comments.findOne(commentId).numLikes;
      Comments.update({ _id: commentId}, {
        "$set": { numLikes: numLikes-1 }
        }
      );
    }
  },

  'Comments.setNumLikes': function (commentId, newNumLikes) {
    var comment = Comments.findOne({
      _id: commentId
    });
    if (comment) {
      console.log("changing comment's numlikes");
      Comments.update({ _id: commentId}, {
        "$set": { numLikes: newNumLikes }
        }
      );
    }
  },

  'Comments.upvote': function (commentId, userId) {

    var comment = Comments.findOne({_id: commentId});

    if (!comment) {
      console.log("comment doesnt exist");
      return false;
    }

    // if (post.userId == userId) {
    //   console.log("Can't upvote your own post");
    //   return false;
    // }

    var voter = Meteor.users.findOne({_id: userId});
    var author = Meteor.users.findOne({_id: comment.userId});

    // call method to increase rep

    var upvoters = comment.upvoterIds;
    var downvoters = comment.downvoterIds;

    var didIUpvote = upvoters.indexOf(userId);

    var didIDownvote = downvoters.indexOf(userId);

    var numLikes = comment.numLikes;
    var authorId = comment.userId;

    // if I was already in upvoters' list, remove me from 
    // the upvoters list.
    if (didIUpvote >= 0) {

      upvoters.splice(didIUpvote, 1);

      Comments.update({ _id: comment._id}, {
        "$set": { upvoterIds: upvoters }
      });

      //cancelling my previous upvote
      //do not push a notification
      Meteor.call("Comments.setNumLikes", commentId, numLikes-1);

      Meteor.call("Users.setRep", author._id, author.rep-1);

    } else if (didIDownvote >= 0) {

      downvoters.splice(didIDownvote, 1);
      upvoters.push(userId);

      Comments.update({ _id: comment._id}, {
        "$set": { downvoterIds: downvoters }
      });

      Comments.update({ _id: comment._id}, {
        "$set": { upvoterIds: upvoters }
      });

      Meteor.call("Comments.setNumLikes", commentId, numLikes+2);
      Meteor.call("Users.setRep", author._id, author.rep+1);

      Meteor.call("addNotification", {
        fromUserId: Meteor.userId(),
        toUserId: authorId,
        postId: comment.postId,
        commentId: comment._id,
        body: "Your comment got an upvote :)",
        icon: "thumbsup",
        type: "upvote"
      });
    } else {

      upvoters.push(userId);

      Comments.update({ _id: comment._id}, {
        "$set": { upvoterIds: upvoters }
      });

      Meteor.call("Comments.setNumLikes", commentId, numLikes+1);
      Meteor.call("Users.setRep", author._id, author.rep+1);
      Meteor.call("Users.setRep", voter._id, voter.rep+1);

      Meteor.call("addNotification", {
        fromUserId: Meteor.userId(),
        toUserId: authorId,
        postId: comment.postId,
        commentId: comment._id,
        body: "Your comment got an upvote :)",
        icon: "thumbsup",
        type: "upvote"
      });
    }
  },

  'Comments.downvote': function (commentId, userId) {
    var comment = Comments.findOne({
      _id: commentId
    });

    if (!comment) {
      console.log("comment doesnt exist");
      return false;
    }

    // if (post.userId == userId) {
    //   console.log("Can't downvote your own post");
    //   return false;
    // }

    var voter = Meteor.users.findOne({_id: userId});
    var author = Meteor.users.findOne({_id: comment.userId});

    var upvoters = comment.upvoterIds;
    var downvoters = comment.downvoterIds;
    var didIUpvote = upvoters.indexOf(userId);
    var didIDownvote = downvoters.indexOf(userId);
    var numLikes = comment.numLikes;
    var authorId = comment.userId;


    if (didIDownvote >= 0) {

      downvoters.splice(didIDownvote, 1);

      Comments.update({ _id: comment._id}, {
        "$set": { downvoterIds: downvoters }
      });

      //cancelling my previous downvote: do not push
      //a notification
      Meteor.call("Comments.setNumLikes", commentId, numLikes+1);  
      Meteor.call("Users.setRep", author._id, author.rep+1);  

    } else if (didIUpvote >= 0) {

      upvoters.splice(didIUpvote, 1);
      downvoters.push(userId);
      
      Comments.update({ _id: comment._id}, {
        "$set": { upvoterIds: upvoters }
      });

      Comments.update({ _id: comment._id}, {
        "$set": { downvoterIds: downvoters }
      });

      Meteor.call("Comments.setNumLikes", commentId, numLikes-2);
      Meteor.call("Users.setRep", author._id, author.rep-1);

      Meteor.call("addNotification", {
        fromUserId: Meteor.userId(),
        toUserId: authorId,
        postId: comment.postId,
        commentId: comment._id,
        body: "Your comment got a downvote :(",
        icon: "thumbsdown",
        type: "downvote"
      });

    } else {

      downvoters.push(userId);

      Comments.update({ _id: comment._id}, {
        "$set": { downvoterIds: downvoters }
      });

      Meteor.call("Comments.setNumLikes", commentId, numLikes-1);

      Meteor.call("Users.setRep", author._id, author.rep-1);
      Meteor.call("Users.setRep", voter._id, voter.rep+1);

      Meteor.call("addNotification", {
        fromUserId: Meteor.userId(),
        toUserId: authorId,
        postId: comment.postId,
        commentId: comment._id,
        body: "Your comment got a downvote :(",
        icon: "thumbsdown",
        type: "downvote"
      });
    }
  }
});
