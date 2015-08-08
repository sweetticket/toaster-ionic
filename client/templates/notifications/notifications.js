Template.notifications.onDestroyed(function() {
  Meteor.call("readAllNotifications")
});

Template.notifications.helpers({
  isNotificationEmpty: function() {
    return (Notifications.find({}).count() === 0);
  },

  notifications: function() {
    return Notifications.find({}, {sort: {
      createdAt: -1
    }});
  }
});

Template._notifications.helpers({
  "postPreview": function() {
    return Posts.findOne({_id: this.postId}).body;
  }
});
