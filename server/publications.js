Meteor.publish('userNetwork', function() {
  if (!this.userId) {
    return [];
  }

  var user = Meteor.users.findOne({_id: this.userId});
  return Networks.find({_id: user.networkId});
});

//FIXME: we need infinite scrolling for notifications too
Meteor.publish('notiPosts', function (limit) {
  if (!this.userId) {
    return [];
  }

  var user = Meteor.users.findOne({_id: this.userId});
  return Posts.find({networkId: user.networkId}, {
    sort: {createdAt: -1}
  });
});

Meteor.publish('notiComments', function (limit) {
  if (!this.userId) {
    return [];
  }

  var user = Meteor.users.findOne({_id: this.userId});

  return Comments.find({networkId: user.networkId, userId: this.userId}, {
    sort: {createdAt: -1}
  });
});

// Meteor.publish('trendingPosts', function (limit) {
//   // For trending posts, we take the most 200 recents posts
//   // and sort them in the order of our ranking metric
//   if (!this.userId) {
//     return [];
//   }

//   var user = Meteor.users.findOne({_id: this.userId});
//   return Posts.find({networkId: user.networkId}, {
//     sort: {createdAt: -1},
//     limit: 100
//   });
// });

Meteor.publish('comments', function() {
  if (!this.userId) {
    return [];
  }

  var user = Meteor.users.findOne({_id: this.userId});
  return Comments.find({
    networkId: user.networkId
  });
});

Meteor.publish('commentsForPost', function (postId) {
  console.log("commentsForPost Called")

  if (!this.userId) {
    return [];
  }

  console.log("commentsForPost", postId);

  var user = Meteor.users.findOne({_id: this.userId});
  return Comments.find({
    postId: postId,
    // networkId: user.networkId // just to doublecheck
  });
}, {
  url: "get-comments-for-post/:0",
  httpMethod: "get"
});

Meteor.publishComposite('post', function(_id) {
  var user = Meteor.users.findOne({_id: this.userId});

  return {
    find: function() {
      if (!this.userId) {
        return;
      }

      return Posts.find({
        _id: _id,
        networkId: user.networkId
      });
    },
    children: [
      {
        find: function(post) {
          return Meteor.users.find({_id: post.userId});
        }
      },
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
                'rep': true,
              }});
            }
          }
        ]
      }
    ]
  };
});

Meteor.publishComposite('recentPostsAndComments', function (limit) {
  var user = Meteor.users.findOne({_id: this.userId});

  if (user) {
    console.log("recentPostsAndComments", user._id);
  }

  if (limit > Posts.find().count()) {
    limit = 0;
  }

  return {
    find: function() {
      if (!this.userId) {
        return;
      }

      return Posts.find({
        networkId: user.networkId
      }, {
        sort: {createdAt: -1},
        limit: limit
      });
    },
    children: [
      {
        find: function (post) {
          return Comments.find(
            {postId: post._id},
            {fields: {postId: 1, _id: 1}}
          );
        }
      }
    ]
  }
});

Meteor.publishComposite('trendingPostsAndComments', function() {
  var user = Meteor.users.findOne({_id: this.userId});

  if (user) {
    console.log("trendingPostsAndComments", user._id);
  }

  return {
    find: function() {
      if (!this.userId) {
        return;
      }

      return Posts.find({
        networkId: user.networkId
      }, {
        sort: {createdAt: -1},
        limit: 100
      });
    },
    children: [
      {
        find: function (post) {
          return Comments.find({postId: post._id});
        }
      }
    ]
  }
});

// publish all posts and comments written by the user
Meteor.publishComposite('userPostsComments', function() {
  return {
    find: function() {
      if (!this.userId) {
        return;
      }

      return Meteor.users.find({_id: this.userId}, {fields: {
        '_id': true,
        'emails': true,
        'networkId': true,
        'color': true,
        'icon': true,
        'rep': true,
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
        },
        children: [
          {
            find: function (comment) {
              return Posts.find({
                _id: comment.postId
              }, {sort: {
                createdAt: -1
                }}
              )
            }
          }
        ]
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

Meteor.publish('notifications', function() {
  if (!this.userId) {
    return [];
  }

  return Notifications.find({
    toUserId: this.userId,
  });
});

// FIXME: these are not subscribed yet.
Meteor.publish('userInfo', function() {
  if (!this.userId) {
    return [];
  }

  return Meteor.users.find({_id: this.userId}, {fields: {
    '_id': true,
    'emails': true,
    'networkId': true,
    'color': true,
    'icon': true,
    'rep': true,
  }});
  
});

Meteor.publish('otherUserInfo', function() {
  if (!this.userId) {
    return [];
  }
  
  var user = Meteor.users.findOne({_id: this.userId}); 
  var currentNetworkId = user.networkId;
  return Meteor.users.find({networkId: currentNetworkId},
    {fields: {'_id': 1, 'networkId': 1, 'color': 1, 'icon': 1, 'rep': 1}});
});


Meteor.publish('myNotiCount', function() {
  if (!this.userId) {
    return [];
  }

  Counts.publish(this, 'notiCount', Notifications.find({
    toUserId: this.userId,
    isRead: false
  }));
});



