// startup stuff

Meteor.startup(function() {
  if (Meteor.isClient) {

    Push.addListener("error", function (err) {
      console.log("Push notification Error", err);
      // Push.setBadge(Notifications.find().count()+1);
    });

    Push.addListener('token', function(token) {
      console.log(token);
    });

    Push.addListener('error', function(err) {
        if (error.type == 'apn.cordova') {
            console.log(err.error);
        }
    });

    Push.addListener('register', function(evt) {
      console.log(evt);
        // Platform specific event - not really used
    });

    Push.addListener('alert', function(notification) {
      console.log(notification);
        // Called when message got a message in forground
    });


    Push.addListener('message', function(notification) {
        console.log(notification)
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
