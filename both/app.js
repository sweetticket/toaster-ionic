// startup stuff

Meteor.startup(function() {
  if (Meteor.isClient) {
    console.log("new version");

    Push.addListener("error", function (err) {
      console.log("Push notification Error", err);
    });

    Push.addListener('token', function (token) {
      alert(JSON.stringify(token));
      console.log(token);
      console.log("HOWON ADDING TOKEN");
      Meteor.call('raix:push-update', {
        appName: "Toaster",
        token: token,
        userId: ""
      });
    });

    Push.addListener('message', function (msg) {
      console.log("msg received push:", msg);
    });

    // Set number of posts tokeno fetch at once
    NUM_POSTS_IN_BATCH = 8;

    // Set MomentJS Korean
    moment.locale('ko');
  }

  if (Meteor.isServer) {
    Push.debug = true;
  }

  if (Meteor.isCordova) {
    console.log("cordova phone");
    IonKeyboard.hideKeyboardAccessoryBar();
  }
});
