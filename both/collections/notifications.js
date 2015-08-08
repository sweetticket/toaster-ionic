Notifications = new Mongo.Collection("notifications");

//server code for notification
if (Meteor.isServer) {
  Meteor.methods({
    addNotification: function (noti) {

      // HOWON: FIXME:
      // Temporarily disabled for testing purposes
      // if (noti.fromUserId === noti.toUserId) {
      //   console.log("NOTI: from === to. Abort!");
      //   return false;
      // }

      Notifications.insert(_.extend(noti, {
        isRead: false,
        createdAt: new Date()
      }, function (err, notificationId) {
        console.log("noti added", notificationId);
        if (err) {
          console.log("NOTIFICATION INSERT ERR", err);
        } else {
          debugger
          Push.send({
            from: noti.fromUserId,
            title: '토스트',
            text: noti.body,
            query: {userId: noti.toUserId}
            // query: {}
          });
        }
      }))
    },

    readAllNotifications: function() {
      var userId = this.userId;
      Notifications.update({
        toUserId: userId
      }, {$set: {
        isRead: true
      }}, {
        multi: true
      });
      console.log("all notifications are read!");
    }
  });
}

if (Meteor.isClient) {
  Meteor.startup(function() {
    Tracker.autorun(function() {
      var userId = Meteor.userId();
      if (userId) {
        Push.addListener("message", function (notification) {
          console.log("Push notification received");
          Push.setBadge(Notifications.find({
            toUserId: Meteor.userId(),
            isRead: false
          }).count()+1);
        });
      }
    })
  });
}
