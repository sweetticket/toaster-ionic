Template.notifications.onCreated(function() {
  this.autorun(function () {
    this.subscribe('recentPosts');
  }.bind(this));
});

Template.notifications.onDestroyed(function() {
  Meteor.call("readAllNotifications");
});

Template.notifications.helpers({
  isNotificationEmpty: function() {
    return (Notifications.find({}).count() === 0);
  },

  notifications: function() {
    return Notifications.find({}, {
      sort: {createdAt: -1},
      limit: 50
    });
  }
});

Template._notificationItem.helpers({
  "isReadClass": function() {
    if (!this.isRead) {
      return "is-new";
    }
    return "";
  },
  "postFromNoti": function() {
    return Posts.findOne({_id: this.postId});
  },
  "getCoundUnread": function() {
    if (this.countUnread < 1) {
      return "";
    }
    return this.countUnread;
  }
});
