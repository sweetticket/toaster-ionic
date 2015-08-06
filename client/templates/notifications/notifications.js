// Template.notifications.created = function () {
//   this.autorun(function () {
//     this.subscription = Meteor.subscribe("notifications");
//   }.bind(this));
// };

Template.notifications.rendered = function () {
  Meteor.call("readAllNotifications")
};

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
