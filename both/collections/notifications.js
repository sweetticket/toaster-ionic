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

      Notifications.insert(notification, function (err, notificationId) {
        if (err) {
          console.log("NOTIFICATION INSERT ERR", err);
        } else {
          Push.send({
            from: 'push',
            title: '토스트에',
            text: 'Comment:'+notification.body,
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