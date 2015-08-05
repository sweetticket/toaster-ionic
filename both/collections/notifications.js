Notifications = new Mongo.Collection("notifications");

//server code for notification
if (Meteor.isServer) {
  Meteor.methods({
    addNotification: function (notification) {
      console.log("addNotification");

      var userId = notification.userId;

      var notification = _.extend(notification, {
        isRead: false,
        createdAt: new Date()
      });

      console.log(notification);

      Notifications.insert(notification, function (err, notificationId) {
        if (!err) {
          console.log("sending push noti")
          Push.send({
            from: 'push',
            title: 'Hello',
            text: 'world',
            badge: 1,
            query: {userId: userId}
          });
          console.log("sent push noti")
        }
      });
    }
  });
}

Meteor.methods({

  readAllNotifications: function (userId) {
    Notifications.update({
      userId: userId
    }, { "$set": {
      isRead: true
    }});
  },

  readNotification: function (notificationId) {
    Notifications.update({
      _id: notificationId
    }, { "$set": {
      isRead: true
    }});
  }

});