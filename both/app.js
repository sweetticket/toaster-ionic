// startup stuff

Meteor.startup(function() {

  // if (Meteor.isCordova) {
  //   ionic.keyboard.disable()
  //   cordova.plugins.Keyboard.disableScroll(true);
  // }

  if (Meteor.isClient) {
    console.log("new version");

    Push.addListener("error", function (err) {
      console.log("Push notification Error", err);
    });

    Push.addListener('message', function (msg) {
      console.log("msg received push:", JSON.stringify(msg));
    });

    // Set number of posts tokeno fetch at once
    NUM_POSTS_IN_BATCH = 8;

    // Set MomentJS Korean
    moment.locale('en');
  }

  if (Meteor.isServer) {
    PUSH_TOKEN = null;
    Push.debug = true;
  }

  if (Meteor.isCordova) {
    console.log("im cordova");
    StatusBar.styleLightContent();
    StatusBar.backgroundColorByHexString("#ff464f");
  }
});
