var isLoggedIn = function() {
  console.log("Meteor.loggingIn() = " + Meteor.loggingIn());
  console.log("Meteor.user() = " + Meteor.user());
  if (!Meteor.loggingIn() && !Meteor.user()) {
    if (Meteor.isClient) {
      // if (Router.current().route._path === '/trending' && Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
      if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
        setTimeout(function() {
            alert('start-signup');
        }, 0);
      }
    }
    Router.go('signUp');
    this.next();
  } else {
    isVerified.call(this);
    // this.next();
  }
}

var isVerified = function() {
  var user = Meteor.user();
  if (user) {
    if (user.emails[0].verified) {
      this.next();
    } else {
      
      if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
        setTimeout(function() {
            // alert('notVerified'); 
        }, 0);
        Router.go("blank");
      } else {
        Router.go("notVerified");
      }

    }
  } else {
    this.next();
  }
}

AppController = RouteController.extend({
  layoutTemplate: 'appLayout'
});

TrendingController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
  }
});

RecentController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
    // isVerified.call(this);
  }
});

PostsShowController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
  },
});

UsersShowController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
  }
});

NotificationsController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
  }
});

ProfileController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
  }
});

SignInController = AppController.extend({
  onAfterAction: function() {
    if (Utils.getMobileOperatingSystem() === 'iOS') {
      window.location = "toasterapp://signIn";
    }
  }
});

SignUpController = AppController.extend({
  onAfterAction: function() {
    if (Utils.getMobileOperatingSystem() === 'iOS') {
      window.location = "toasterapp://signUp";
    }
  }
});

NotVerifiedController = AppController.extend({
});

SettingsController = AppController.extend({
});

AboutController = AppController.extend({
});

TermsController = AppController.extend({
});

PrivacyController = AppController.extend({
});

GetToasterController = AppController.extend({
});

BlankController = AppController.extend({

});