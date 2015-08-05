Meteor.publish('posts', function() {
  return Posts.find();
});

// Meteor.publish('productsSearch', function(query) {
//   check(query, String);

//   if (_.isEmpty(query)) {
//     return this.ready();
//   }

//   return Products.search(query);
// });

Meteor.publishComposite('post', function(_id) {
  return {
    find: function() {
      return Posts.find({_id: _id});
    },
    children: [
      {
        find: function(post) {
          return Meteor.users.find({_id: post.userId});
        }
      },
      // {
      //   find: function(post) {
      //     return Meteor.users.find({_id: post.voterIds});
      //   }
      // },
      {
        find: function(post) {
          return Comments.find({postId: post._id});
        },
        children: [
          {
            find: function(comment) {
              return Meteor.users.find({_id: comment.userId});
            }
          }
        ]
      }
    ]
  };
});

Meteor.publishComposite('user', function(_id) {
  return {
    find: function() {
      return Meteor.users.find({_id: _id});
    },
    // children: [
    //   {
    //     find: function(user) {
    //       return Posts.find({_id: {$in: user.profile.votedProductIds}});
    //     }
    //   }
    // ]
  };
});
