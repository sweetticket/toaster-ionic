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
  }

  if (Meteor.isServer) {
    // Push.debug = true;
  }

  if (Meteor.isCordova) {
    StatusBar.styleLightContent();
    StatusBar.backgroundColorByHexString("#ff464f");
  }
});
