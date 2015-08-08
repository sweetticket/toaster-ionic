Meteor.publish('userNetwork', function() {
  var user = Meteor.users.findOne({_id: this.userId});
  return Networks.find({_id: user.networkId});
});

Meteor.publish('recentPosts', function (limit) {
  // Meteor._sleepForMs(2000);
  var user = Meteor.users.findOne({_id: this.userId});
  return Posts.find({networkId: user.networkId}, {
    sort: {createdAt: -1},
    limit: limit
  });
});

Meteor.publish('trendingPosts', function (limit) {
  // Meteor._sleepForMs(2000);
  var user = Meteor.users.findOne({_id: this.userId});
  return Posts.find({networkId: user.networkId}, {
    limit: limit
  });
  // return Posts.find({networkId: user.networkId},
  //   sort: {createdAt: -1},
  //   limit: limit
  // );
});


Meteor.publish('comments', function() {
  var user = Meteor.users.findOne({_id: this.userId});
  var user = Meteor.users.findOne({_id: this.userId});
  return Comments.find({
    networkId: user.networkId
  });
});

Meteor.publishComposite('post', function(_id) {
  var user = Meteor.users.findOne({_id: this.userId});
  return {
    find: function() {
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

Meteor.publish('notifications', function() {
  if (this.userId) {
    return Notifications.find({
      toUserId: this.userId,
      // isRead: false
    });
  } else {
    this.ready();
  }
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
  if (this.userId) {
    var user = Meteor.users.findOne({_id: this.userId}); 
    var currentNetworkId = user.networkId;
    return Meteor.users.find({networkId: currentNetworkId},
      {fields: {'_id': 1, 'networkId': 1, 'color': 1, 'icon': 1}});
  } else {
    this.ready();
  }
});
