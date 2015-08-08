// startup stuff

Meteor.startup(function() {
  if (Meteor.isClient) {
    console.log("new version");

    Push.addListener("error", function (err) {
      console.log("Push notification Error", err);
    });

    Push.addListener('token', function (token) {
      console.log("HOWON ADDING TOKEN");
      PUSH_TOKEN = token;
      if (Push.appCollection.find().count() === 0) {
        Meteor.call('raix:push-update', {
          appName: "Toaster",
          token: token,
          userId: Meteor.userId() || ""
        });
      }
    });

    Push.addListener('message', function (msg) {
      console.log("msg received push:", JSON.stringify(msg));
    });

    // Set number of posts tokeno fetch at once
    NUM_POSTS_IN_BATCH = 8;

    // Set MomentJS Korean
    moment.locale('ko');
  }

  if (Meteor.isServer) {
    PUSH_TOKEN = null;
    Push.debug = true;
  }

  if (Meteor.isCordova) {
    IonKeyboard.hideKeyboardAccessoryBar();
  }
});
