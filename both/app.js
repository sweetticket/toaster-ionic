// startup stuff

Meteor.startup(function() {
  if (Meteor.isClient) {

    // Push.addListener("error", function (err) {
    //   console.log("Push notification Error", err);
    //   // Push.setBadge(Notifications.find().count()+1);
    // });

    // Push.addListener('token', function (token) {
    //   console.log(token);

    //   Meteor.call("raix:push-update", {
    //     token: token
    //   }, function() {
    //     console.log("Yay");
    //   });
      
    //   console.log("stored token");
    // });

    // Set number of posts to fetch at once
    NUM_POSTS_IN_BATCH = 8;

    // Set MomentJS Korean
    moment.locale('ko');
  }

  if (Meteor.isServer) {
    Push.debug=true;
  }

  if (Meteor.isCordova) {
    console.log("cordova phone");
    IonKeyboard.hideKeyboardAccessoryBar();
  }
});
