Notifications = new Mongo.Collection("notifications");

//server code for notification
if (Meteor.isServer) {
  Meteor.methods({
    addNotification: function (noti) {
      // don't add notification if I am acting on my own post
      if (noti.fromUserId === noti.toUserId) {
        return false;
      }

      // If there's a notification for the same post, let's replace the
      // old notification with a new one
      // var exists = Notifications.findOne({
      //               toUserId: noti.toUserId,
      //               postId: noti.postId,
      //               commentId: noti.commentId,
      //               body: noti.body
      //             });
      // var countUnread = 1;
      // if (exists) {
      //   if (exists.fromUserId !== noti.fromUserId ||
      //       (exists.fromUserId === noti.fromUserId &&
      //       (noti.type !== exists.type || noti.type === "comment"))) {
      //         countUnread += exists.countUnread;
      //       }
      //     Notifications.remove(exists._id);
      // }

      Notifications.insert(_.extend(noti, {
        isRead: false,
        countUnread: countUnread,
        createdAt: new Date()
      }), function (err, notificationId) {
        if (err) {
          console.log("NOTIFICATION INSERT ERR", err);
        } else {
          Meteor.call("sendPushNotiToParse", noti.toUserId, noti.body);
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
    },

    // get unread notifications count for the current user
    getNumUnreadNotis: function (userId) {
      console.log("getNumUnread:", userId);

      var notis = Notifications.find({
        toUserId: userId,
        isRead: false
      }).fetch();

      console.log(notis);

      var numUnreads = _.reduce(notis, function (acc, noti) {
        return acc + noti.countUnread;
      }, 0);

      return numUnreads;
    }
  });
}
