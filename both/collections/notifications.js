Notifications = new Mongo.Collection("notifications");

//server code for notification
if (Meteor.isServer) {
  Meteor.methods({
    addNotification: function (noti) {
      // don't add notification if I am acting on my own post
      // FIXME: temporarily disabled checking if this is my post
      // if (noti.fromUserId === noti.toUserId) {
      //   return false;
      // }

      // If there's a notification for the same post, let's replace the
      // old notification with a new one
      var exists = Notifications.findOne({
                    toUserId: noti.toUserId,
                    postId: noti.postId,
                    commentId: noti.commentId,
                    body: noti.body
                  });
      var countUnread = 1;
      if (exists) {
        if (exists.fromUserId !== noti.fromUserId ||
            (exists.fromUserId === noti.fromUserId &&
            (noti.type !== exists.type || noti.type === "comment"))) {
              countUnread += exists.countUnread;
            }
          Notifications.remove(exists._id);
      }

      Notifications.insert(_.extend(noti, {
        isRead: false,
        countUnread: countUnread,
        createdAt: new Date()
      }), function (err, notificationId) {
        // console.log("noti added", notificationId);
        if (err) {
          console.log("NOTIFICATION INSERT ERR", err);
        } else {
          // private-RCi5nFGCcX45N4HH9
          // PushUtils.sendPusherNoti("private-" + noti.toUserId, 'Toaster', {
          //   message: noti.body
          // }, null, function (err) {
          //   if (err) {
          //     console.log(err);
          //     return;
          //   }
            
            console.log("Pushing to", noti.toUserId);
          //   // console.log("Push noti sent!");
          // }); 
          // var channel = "private-" + noti.toUserId;
          var channel = noti.toUserId;
          // var eventName = "Toaster";
          var messageBody = noti.body;
          // PushUtils.sendPusherNoti(channel, eventName, messageBody); 
          PushUtils.sendPushNoti(channel, messageBody);
        }
      });
    },

    readAllNotifications: function() {
      var userId = this.userId;
      Notifications.update({
        toUserId: userId
      }, {$set: {
        isRead: true,
        countUnread: 0,
      }}, {
        multi: true
      });
      console.log("all notifications are read!");
    }
  });
}

if (Meteor.isClient) {
  Meteor.startup(function() {
    //subscribe to notification counts
    //and update it reactively
    var unreadBadgeCount = 0;
    Tracker.autorun(function() {
      Meteor.subscribe("countPublication");
      unreadBadgeCount = Counts.get('unreadNotiCount');
    });
    
    Tracker.autorun(function() {
      var userId = Meteor.userId();
      if (userId) {
        // Push.addListener("message", function (notification) {
        //   console.log("Push notification received");
        //   Push.setBadge(unreadBadgeCount+1);
        // });
      }
    })
  });
}
