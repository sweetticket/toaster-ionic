// startup stuff

Meteor.startup(function() {

  // if (Meteor.isCordova) {
  //   ionic.keyboard.disable()
  //   cordova.plugins.Keyboard.disableScroll(true);
  // }

  if (Meteor.isClient) {
    // Push.addListener("error", function (err) {
    //   console.log("Push notification Error", err);
    // });

    // Push.addListener('message', function (msg) {
    //   console.log("msg received push:", JSON.stringify(msg));
    // });

    // Set number of posts to fetch at once
    NUM_POSTS_IN_BATCH = 30;

    // Set MomentJS English or Korean
    moment.locale('en');

    // var pusher = new Pusher('3f8ba7f168a24152f488');
    // var userId = Meteor.userId();
    // var channelId = "private-"+userId;
    // var channel = pusher.subscribe(channelId);
    // channel.bind('Toaster', function(data) {
    //   alert('An event was triggered with message: ' + data.message);
    // });
    Tracker.autorun(function() {
      var DDPConnectionStatus = Meteor.status();
      console.log(DDPConnectionStatus);
      if (DDPConnectionStatus.connected) {
        window.location = "toasterapp://DDPconnected";
      }
    });
  }
});
