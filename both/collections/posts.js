Posts = new Mongo.Collection('posts');

Posts.before.insert(function (userId, doc) {
  var authorRep = Meteor.users.findOne({_id: userId}).rep;
  Meteor.call("Users.setRep", userId, authorRep+1);
  doc.createdAt = new Date();
});

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

// RegExp.escape = function(s) {
//   return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
// };

// posts.search = function(query) {
//   if (!query) {
//     return;
//   }
//   return posts.find({
//     name: { $regex: RegExp.escape(query), $options: 'i' }
//   }, {
//     limit: 20
//   });
// };

Posts.attachSchema(new SimpleSchema({
  // url: {
  //   type: String,
  //   autoform: {
  //     'label-type': 'placeholder',
  //     placeholder: 'Product URL'
  //   },
  //   max: 200
  // },
  // name: {
  //   type: String,
  //   autoform: {
  //     'label-type': 'placeholder',
  //     placeholder: 'Product Name'
  //   },
  //   max: 200
  // },
  body: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'You are anonymous...',
      rows: 10
    },
    max: 140
  },
  userId: {
    type: String,
    autoValue: function () {
      if (this.isSet) {
        return;
      }
      if (this.isInsert) {
        return Meteor.userId();
      } else {
        this.unset();
      }
    }
  },
  upvoterIds: {
    type: [String],
    optional: true,
    defaultValue: []
  },
  downvoterIds: {
    type: [String],
    optional: true,
    defaultValue: []
  },
  numLikes: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  networkId: {
    type: String,
    optional: false,
    autoValue: function () {
      if (this.isSet) {
        return;
      }
      if (this.isInsert) {
        return Meteor.user().networkId;
      } else {
        this.unset();
      }
    }
  },
  createdAt: {
    type: Date
  }
}));


Meteor.methods({
  // 'Posts.upvote': function (_id) {
  //   if (!Meteor.user()) {
  //     return;
  //   }

  //   if (_(Meteor.user().profile.votedProductIds).include(_id)) {
  //     return;
  //   }

  //   Products.update({_id: _id}, {$inc: {numberOfVotes: 1}, $addToSet: {voterIds: this.userId}});
  //   Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.votedProductIds': _id}});
  // },

  //DELETE COMMENTS, UPVOTERS, AND DOWNVOTERS
  'Posts.delete': function (postId) {
    Posts.remove({
      _id: postId
    });
    Comments.remove({
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

    // if (post.userId == userId) {
    //   console.log("Can't upvote your own post");
    //   return false;
    // }

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

      Meteor.call("Users.setRep", author._id, author.rep-1);

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
      Meteor.call("Users.setRep", author._id, author.rep+1);

      Meteor.call("addNotification", {
        fromUserId: Meteor.userId(),
        toUserId: authorId,
        postId: postId,
        commentId: null,
        body: "You got an upvote :)",
        icon: "thumbsup",
        type: "upvote"
      });
    } else {

      upvoters.push(userId);

      Posts.update({ _id: post._id}, {
        "$set": { upvoterIds: upvoters }
      });

      Meteor.call("Posts.setNumLikes", postId, numLikes+1);
      Meteor.call("Users.setRep", author._id, author.rep+1);
      Meteor.call("Users.setRep", voter._id, voter.rep+1);

      Meteor.call("addNotification", {
        fromUserId: Meteor.userId(),
        toUserId: authorId,
        postId: postId,
        commentId: null,
        body: "You got an upvote :)",
        icon: "thumbsup",
        type: "upvote"
      });
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

    // if (post.userId == userId) {
    //   console.log("Can't downvote your own post");
    //   return false;
    // }

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
      Meteor.call("Users.setRep", author._id, author.rep+1);  

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
      Meteor.call("Users.setRep", author._id, author.rep-1);

      Meteor.call("addNotification", {
        fromUserId: Meteor.userId(),
        toUserId: authorId,
        postId: postId,
        commentId: null,
        body: "You got a downvote :(",
        icon: "thumbsdown",
        type: "downvote"
      });

    } else {

      downvoters.push(userId);

      Posts.update({ _id: post._id}, {
        "$set": { downvoterIds: downvoters }
      });

      Meteor.call("Posts.setNumLikes", postId, numLikes-1);

      Meteor.call("Users.setRep", author._id, author.rep-1);
      Meteor.call("Users.setRep", voter._id, voter.rep+1);

      Meteor.call("addNotification", {
        fromUserId: Meteor.userId(),
        toUserId: authorId,
        postId: postId,
        commentId: null,
        body: "You got a downvote :(",
        icon: "thumbsdown",
        type: "downvote"
      });
    }
  }
});
