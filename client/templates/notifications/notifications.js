Template.notifications.onCreated(function() {
  var numNotificationLimit = 300;
  this.autorun(function () {
    this.subscribe('notiPosts');
  }.bind(this));
});

Template.notifications.onDestroyed(function() {
  Meteor.call("readAllNotifications");
});

Template.notifications.onRendered(function() {
  this.autorun(function() {
    if (this.subscriptionsReady()) {
      Utils.hideLoading();
    }
  }.bind(this));
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
  "itemFromNoti": function() {
    if (this.commentId !== null) {
      return Comments.findOne({_id: this.commentId});
    }
    return Posts.findOne({_id: this.postId});
  },
  "getCoundUnread": function() {
    if (this.countUnread < 1) {
      return "";
    }
    return this.countUnread;
  }
});
