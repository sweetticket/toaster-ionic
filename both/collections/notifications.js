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
      var fromId = this.userId;

      Notifications.insert(notification, function (err, notificationId) {
        if (err) {
          console.log("NOTIFICATION INSERT ERR", err);
        } else {
          console.log("send push noti")
          Push.send({
            from: fromId,
            title: '댓글 알림',
            text: ('Comment:'+notification.body),
            // query: {userId: userId},
            query: {}
          });
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