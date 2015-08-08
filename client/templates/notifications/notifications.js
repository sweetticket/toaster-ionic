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

  // "apn": {
  //   "passphrase": "13201320",  
  //   "key": "prod_key.pem",
  //   "cert": "prod_cert.pem",
  //   "gateway": "gateway.push.apple.com"
  // },