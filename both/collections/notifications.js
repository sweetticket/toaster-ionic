Notifications = new Mongo.Collection("notifications");

//server code for notification
if (Meteor.isServer) {
  Meteor.methods({
    addNotification: function (noti) {
      console.log(noti);

      // don't add notification if I am acting on my own post
      // if (noti.fromUserId === noti.toUserId) {
      //   return false;
      // }

      Notifications.insert(_.extend(noti, {
        isRead: false,
        countUnread: 0,
        createdAt: new Date()
      }), function (err, notificationId) {
        if (err) {
          console.log("NOTIFICATION INSERT ERR", err);
        } else {
          Meteor.call("sendPushNotiToParse", noti.toUserId, noti.body);
        }
      });
    },

    readAllNotifications: function (userId) {
      var userId = userId || this.userId;

      Notifications.update({
        toUserId: userId
      }, {$set: { isRead: true }}, {
        multi: true
      });
    },

    // get unread notifications count for the current user
    getNumUnreadNotis: function (userId) {
      var userId = userId || this.userId;

      var numUnreads = Notifications.find({
        toUserId: userId,
        isRead: false
      }).count();
      console.log("numNotifications:", numUnreads);
      return numUnreads;
    }
  });
}
