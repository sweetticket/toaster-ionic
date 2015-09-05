Template.notifications.onCreated(function() {
  var numNotificationLimit = 300;
  this.autorun(function () {
    this.subscribe('notiPosts');
    this.subscribe('notiComments');
  }.bind(this));
});

Template.notifications.onDestroyed(function() {
  Meteor.call("readAllNotifications");
});

Template.notifications.onRendered(function() {
  this.autorun(function() {
    if (this.subscriptionsReady()) {
      if (Utils.getMobileOperatingSystem() === 'iOS') {
        setTimeout(function() {
          // This 100ms delay is important.
          // Even when the subscription is ready, we still need
          // extra time for everything to be rendered
          window.location = "toasterapp://loadingEnd";  
        }, 100);
      }
      
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
