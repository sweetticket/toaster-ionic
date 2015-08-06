Notifications = new Mongo.Collection("notifications");

//server code for notification
if (Meteor.isServer) {
  Meteor.methods({
    addNotification: function (noti) {
      if (fromUserId === toUserId) {
        console.log("NOTI: from === to. Abort!");
        return false;
      }

      Notifications.insert(_extend(noti, {
        isRead: false,
        createdAt: new Date()
      }, function (err, notificationId) {
        if (err) {
          console.log("NOTIFICATION INSERT ERR", err);
        } else {
          Push.send({
            from: noti.fromUserId,
            title: '토스트',
            text: noti.body,
            query: {userId: noti.toUserId}
            // query: {}
          });
        }
      }))
    }
  });
}

Meteor.methods({
  readAllNotifications: function() {
    var userId = this.userId;
    Notifications.update({
      toUserId: userId
    }, { "$set": {
      isRead: true
    }});
    console.log("all notifications are read!");
  }
});

if (Meteor.isClient) {
  Meteor.startup(function() {
    Tracker.autorun(function() {
      var userId = Meteor.userId();
      if (userId) {
        console.log("PUSH: add listener. Should be called only once");
        Push.addListener("message", function (notification) {
          console.log("Push notification received");
          Push.setBadge(Notifications.find({
            toUserId: Meteor.userId()
          }).count()+1);
        });
      }
    })
  });
}