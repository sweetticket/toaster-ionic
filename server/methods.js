Meteor.methods({
//   'Posts.upvote': function (_id) {
//     if (!Meteor.user()) {
//       return;
//     }

//     if (_(Meteor.user().profile.votedProductIds).include(_id)) {
//       return;
//     }

//     Products.update({_id: _id}, {$inc: {numberOfVotes: 1}, $addToSet: {voterIds: this.userId}});
//     Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.votedProductIds': _id}});
//   }

'Posts.upvote': function (postId, userId) {
  var post = Posts.findOne({
      _id: postId
    });

    if (!post) {
      console.log("post doesnt exist");
      return false;
    }

    // if (post.userId == userId) {
    //   console.log("Can't upvote your own post");
    //   return false;
    // }

    var didIUpvote = post.upvoterIds.indexOf(userId);

    var didIDownvote = post.downvoterIds.indexOf(userId);

    var numLikes = post.numLikes;

    // if I was already in upvoters' list, remove me from 
    // the upvoters list.
    if (didIUpvote >= 0) {

      post.upvoterIds.splice(didIUpvote, 1);

      Meteor.call("setNumLikes", postId, numLikes-1);

    //
    } else if (didIDownvote >= 0) {

      post.downvoterIds.splice(didIDownvote, 1);

      post.upvoterIds.push(userId);


      Meteor.call("setNumLikes", postId, numLikes+2);
    } else {
      
      post.upvoterIds.push(userId);

      Meteor.call("setNumLikes", postId, numLikes+1);
    }
  },

});

// Meteor.methods({
//   // 'Posts.upvote': function (_id) {
//   //   if (!Meteor.user()) {
//   //     return;
//   //   }

//   //   if (_(Meteor.user().profile.votedProductIds).include(_id)) {
//   //     return;
//   //   }

//   //   Products.update({_id: _id}, {$inc: {numberOfVotes: 1}, $addToSet: {voterIds: this.userId}});
//   //   Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.votedProductIds': _id}});
//   // },

//   //DELETE COMMENTS, UPVOTERS, AND DOWNVOTERS
//   'Posts.delete': function (postId) {
//     Posts.remove({
//       _id: postId
//     });
//   },

//   'Posts.decreaseNumLikes': function (postId) {
//     var post = Posts.findOne({
//       _id: postId
//     });
//     if (post) {
//       console.log("decreasing posts' numlikes");
//       var numLikes = Posts.findOne(postId).numLikes;
//       Posts.update({ postId: postId}, {
//         "$set": { numLikes: numLikes-1 }
//         }
//       );
//     }
//   },

//   'Posts.setNumLikes': function (postId, newNumLikes) {
//     var post = Posts.findOne({
//       _id: postId
//     });
//     if (post) {
//       console.log("increasing posts' numlikes");
//       Posts.update({ _id: postId}, {
//         "$set": { numLikes: newNumLikes }
//         }
//       );
//     }
//   },

//   'Posts.upvote': function (postId, userId) {
//   var post = Posts.findOne({
//       _id: postId
//     });

//     if (!post) {
//       console.log("post doesnt exist");
//       return false;
//     }

//     // if (post.userId == userId) {
//     //   console.log("Can't upvote your own post");
//     //   return false;
//     // }

//     var didIUpvote = post.upvoterIds.indexOf(userId);

//     var didIDownvote = post.downvoterIds.indexOf(userId);

//     var numLikes = post.numLikes;

//     // if I was already in upvoters' list, remove me from 
//     // the upvoters list.
//     if (didIUpvote >= 0) {

//       post.upvoterIds.splice(didIUpvote, 1);

//       Meteor.call("setNumLikes", postId, numLikes-1);

//     //
//     } else if (didIDownvote >= 0) {

//       post.downvoterIds.splice(didIDownvote, 1);

//       post.upvoterIds.push(userId);


//       Meteor.call("setNumLikes", postId, numLikes+2);
//     } else {
      
//       post.upvoterIds.push(userId);

//       Meteor.call("setNumLikes", postId, numLikes+1);
//     }
//   },

//   'Post.downvote': function (postId, userId) {
//     var post = Posts.findOne({
//       _id: postId
//     });

//     if (!post) {
//       console.log("post doesnt exist");
//       return false;
//     }

//     // if (post.userId == userId) {
//     //   console.log("Can't downvote your own post");
//     //   return false;
//     // }

//     var didIUpvote = post.upvoterIds.indexOf(userId);

//     var didIDownvote = post.downvoterIds.indexOf(userId);

//     var numLikes = post.numLikes;

//     if (didIDownvote >= 0) {

//       post.downvoterIds.splice(didIDownvote, 1);

//       Meteor.call("setNumLikes", postId, numLikes+1);

    
//     } else if (didIUpvote >= 0) {
      
//       post.upvoterIds.splice(didIUpvote, 1);

//       post.downvoterIds.push(userId);


//       Meteor.call("setNumLikes", postId, numLikes-2);
//     } else {

//       post.downvoterIds.push(userId);

//       Meteor.call("setNumLikes", postId, numLikes-1);
//     }
//   }
// });