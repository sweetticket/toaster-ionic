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
