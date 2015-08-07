// startup stuff

Meteor.startup(function() {
  if (Meteor.isClient) {

    // Push.addListener("message", function (notification) {
    //   console.log("Push notification received");
    //   Push.setBadge(Notifications.find().count()+1);
    // });

    // Set MomentJS Korean
    moment.locale('ko');
  }

  if (Meteor.isServer) {
    // Push.debug=true;
  }
});