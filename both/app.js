// startup stuff

Meteor.startup(function() {
  if (Meteor.isClient) {
    console.log("configure Push client side");

    console.log("listener bound to Push");
    Push.addListener('message', function (notification) {
      console.log("message received PUSH!!!");
      console.log(notification);
    });

    Push.addListener("alert", function (noti) {
      console.log("alert", noti);
    });

    // Set MomentJS Korean
    moment.locale('ko');
  }

  if (Meteor.isServer) {
    Push.debug=true;
    // Push.allow({
    //     send: function(userId, notification) {
    //         return true; // Allow all users to send
    //     }
    // });
  }
})