// startup stuff

Meteor.startup(function() {
  if (Meteor.isClient) {

    Push.addListener("error", function (err) {
      console.log("Push notification Error", err);
      // Push.setBadge(Notifications.find().count()+1);
    });

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
