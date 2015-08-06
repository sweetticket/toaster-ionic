// Template.notifications.created = function () {
//   this.autorun(function () {
//     this.subscription = Meteor.subscribe("notifications");
//   }.bind(this));
// };

// Template.notifications.rendered = function () {
//   this.autorun(function () {
//     if (!this.subscription.ready()) {
//       IonLoading.show();
//     } else {
//       IonLoading.hide();
//     }
//   }.bind(this));
// };

Template.notifications.helpers({
  // user: function () {
  //   if (Meteor.userId()) {
  //     return Meteor.user();
  //   }
  // },

  notifications: function() {
    return Notifications.find({}, {sort: {
      createdAt: -1
    }});
  }
});
