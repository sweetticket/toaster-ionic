Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('comments', function() {
  return Comments.find();
});

// Meteor.publish('postComments', function(_id) {
//   return Comments.find({postId: _id});
// });

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
              return Meteor.users.find({_id: comment.userId}, {fields: {
                '_id': true,
                'emails': true,
                'networkId': true,
                'color': true,
                'icon': true,
              }});
            }
          }
        ]
      }
    ]
  };
});

// publish all posts and comments written by the user
Meteor.publishComposite('userPostsComments', function() {
  return {
    find: function() {
      return Meteor.users.find({_id: this.userId}, {fields: {
        '_id': true,
        'emails': true,
        'networkId': true,
        'color': true,
        'icon': true,
      }});
    },
    children: [
      {
        find: function (user) {
          return Posts.find({
            userId: this.userId
          }, {sort: {
            createdAt: -1
          }});
        }
      },
      {
        find: function (user) {
          return Comments.find({
            userId: this.userId
          }, {sort: {
            createdAt: -1
          }});
        }
      },
      {
        find: function (user) {
          return Networks.find({
            _id: user.networkId
          });
        }
      }
    ]
  };
});

// FIXME: these are not subscribed yet.
Meteor.publish('userInfo', function() {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId}, {fields: {
      '_id': true,
      'emails': true,
      'networkId': true,
      'color': true,
      'icon': true,
    }});
  } else {
    this.ready();
  }
});

Meteor.publish('otherUserInfo', function() {
  console.log(this);
  if (this.userId) {
    var user = Meteor.users.findOne({_id: this.userId}); 
    var currentNetworkId = user.networkId;
    return Meteor.users.find({networkId: currentNetworkId},
      {fields: {'_id': 1, 'networkId': 1, 'color': 1, 'icon': 1}});
  } else {
    this.ready();
  }
});

// Meteor.publishComposite('user', function(_id) {
//   return {
//     find: function() {
//       return Meteor.users.find({_id: _id});
//     },
//     // children: [
//     //   {
//     //     find: function(user) {
//     //       return Posts.find({_id: {$in: user.profile.votedProductIds}});
//     //     }
//     //   }
//     // ]
//   };
// });
