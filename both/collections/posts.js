Posts = new Mongo.Collection('posts');

// Posts.before.insert(function (userId, doc) {
//   var authorRep = Meteor.users.findOne({_id: userId}).rep;
//   Meteor.call("Users.setRep", userId, authorRep+1);
//   doc.createdAt = new Date();
// });

Posts.helpers({
  datePosted: function() {
    return moment(this.createdAt).format('M/D');
  },
  author: function() {
    return Meteor.users.findOne({_id: this.userId});
  },
  upvotes: function() {
    return Meteor.users.find({_id: {$in: this.upvoterIds}}).count();
  },
  downvotes: function() {
    return Meteor.users.find({_id: {$in: this.downvoterIds}}).count();
  },
  numberOfComments: function() {
    return Comments.find({postId: this._id}).count();
  },
});

Meteor.methods({

  'Posts.new': function (body, userId) {
    var user = (userId ? Meteor.users.findOne({_id: userId}) : Meteor.user());

    return Posts.insert({
      body: body,
      userId: user._id,
      upvoterIds: [],
      downvoterIds: [],
      numLikes: 0,
      networkId: user.networkId,
      createdAt: new Date(),
    });
  },

  //DELETE COMMENTS, UPVOTERS, AND DOWNVOTERS
  'Posts.delete': function (postId) {
    Posts.remove({
      _id: postId
    });
    Comments.remove({
      postId: postId
    });
    Notifications.remove({
      postId: postId
    });
  },

  'Posts.decreaseNumLikes': function (postId) {
    var post = Posts.findOne({
      _id: postId
    });
    if (post) {
      console.log("decreasing posts' numlikes");
      var numLikes = Posts.findOne(postId).numLikes;
      Posts.update({ postId: postId}, {
        "$set": { numLikes: numLikes-1 }
        }
      );
    }
  },

  'Posts.setNumLikes': function (postId, newNumLikes) {
    var post = Posts.findOne({
      _id: postId
    });
    if (post) {
      console.log("changing posts' numlikes");
      Posts.update({ _id: postId}, {
        "$set": { numLikes: newNumLikes }
        }
      );
    }
  },

  'Posts.upvote': function (postId, userId) {

    var post = Posts.findOne({_id: postId});

    if (!post) {
      console.log("post doesnt exist");
      return false;
    }

    var voter = Meteor.users.findOne({_id: userId});
    var author = Meteor.users.findOne({_id: post.userId});

    // call method to increase rep

    var upvoters = post.upvoterIds;
    var downvoters = post.downvoterIds;

    var didIUpvote = upvoters.indexOf(userId);

    var didIDownvote = downvoters.indexOf(userId);

    var numLikes = post.numLikes;
    var authorId = post.userId;

    // if I was already in upvoters' list, remove me from 
    // the upvoters list.
    if (didIUpvote >= 0) {

      upvoters.splice(didIUpvote, 1);

      Posts.update({ _id: post._id}, {
        "$set": { upvoterIds: upvoters }
      });

      //cancelling my previous upvote
      //do not push a notification
      Meteor.call("Posts.setNumLikes", postId, numLikes-1);

      return -1;

      // Meteor.call("Users.setRep", author._id, author.rep-1);

    } else if (didIDownvote >= 0) {

      downvoters.splice(didIDownvote, 1);
      upvoters.push(userId);

      Posts.update({ _id: post._id}, {
        "$set": { downvoterIds: downvoters }
      });

      Posts.update({ _id: post._id}, {
        "$set": { upvoterIds: upvoters }
      });

      Meteor.call("Posts.setNumLikes", postId, numLikes+2);
      // Meteor.call("Users.setRep", author._id, author.rep+1);

      Meteor.call("addNotification", {
        fromUserId: userId,
        toUserId: authorId,
        postId: postId,
        commentId: null,
        body: "Someone upvoted your post",
        icon: "thumbsup",
        type: "upvote"
      });

      return 2;

    } else {

      upvoters.push(userId);

      Posts.update({ _id: post._id}, {
        "$set": { upvoterIds: upvoters }
      });

      Meteor.call("Posts.setNumLikes", postId, numLikes+1);
      // Meteor.call("Users.setRep", author._id, author.rep+1);
      // Meteor.call("Users.setRep", voter._id, voter.rep+1);

      Meteor.call("addNotification", {
        fromUserId: userId,
        toUserId: authorId,
        postId: postId,
        commentId: null,
        body: "Someone upvoted your post",
        icon: "thumbsup",
        type: "upvote"
      });

      return 1;
    }
  },

  'Posts.downvote': function (postId, userId) {
    var post = Posts.findOne({
      _id: postId
    });

    if (!post) {
      console.log("post doesnt exist");
      return false;
    }

    var voter = Meteor.users.findOne({_id: userId});
    var author = Meteor.users.findOne({_id: post.userId});

    var upvoters = post.upvoterIds;
    var downvoters = post.downvoterIds;
    var didIUpvote = upvoters.indexOf(userId);
    var didIDownvote = downvoters.indexOf(userId);
    var numLikes = post.numLikes;
    var authorId = post.userId;

    if (didIDownvote >= 0) {

      downvoters.splice(didIDownvote, 1);

      Posts.update({ _id: post._id}, {
        "$set": { downvoterIds: downvoters }
      });

      //cancelling my previous downvote: do not push
      //a notification
      Meteor.call("Posts.setNumLikes", postId, numLikes+1);  
      // Meteor.call("Users.setRep", author._id, author.rep+1);

      return 1;

    } else if (didIUpvote >= 0) {

      upvoters.splice(didIUpvote, 1);
      downvoters.push(userId);
      
      Posts.update({ _id: post._id}, {
        "$set": { upvoterIds: upvoters }
      });

      Posts.update({ _id: post._id}, {
        "$set": { downvoterIds: downvoters }
      });

      Meteor.call("Posts.setNumLikes", postId, numLikes-2);
      // Meteor.call("Users.setRep", author._id, author.rep-1);

      Meteor.call("addNotification", {
        fromUserId: userId(),
        toUserId: authorId,
        postId: postId,
        commentId: null,
        body: "Someone downvoted your post",
        icon: "thumbsdown",
        type: "downvote"
      });

      return -2;

    } else {

      downvoters.push(userId);

      Posts.update({ _id: post._id}, {
        "$set": { downvoterIds: downvoters }
      });

      Meteor.call("Posts.setNumLikes", postId, numLikes-1);

      // Meteor.call("Users.setRep", author._id, author.rep-1);
      // Meteor.call("Users.setRep", voter._id, voter.rep+1);

      Meteor.call("addNotification", {
        fromUserId: userId(),
        toUserId: authorId,
        postId: postId,
        commentId: null,
        body: "Someone downvoted your post",
        icon: "thumbsdown",
        type: "downvote"
      });

      return -1;
    }
  }
});
