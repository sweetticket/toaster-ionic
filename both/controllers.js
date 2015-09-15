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
    if (!Utils.isNativeApp()) {
      Router.go("download");
    }
  }
});

RecentController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
    // isVerified.call(this);
    if (!Utils.isNativeApp()) {
      Router.go("download");
    }
  }
});

PostsShowController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
    if (!Utils.isNativeApp()) {
      Router.go("download");
    }
  },
});

UsersShowController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
    if (!Utils.isNativeApp()) {
      Router.go("download");
    }
  }
});

NotificationsController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
    if (!Utils.isNativeApp()) {
      Router.go("download");
    }
  }
});

ProfileController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
    if (!Utils.isNativeApp()) {
      Router.go("download");
    }
  }
});

SignInController = AppController.extend({
  onBeforeAction: function() {
    if (!Utils.isNativeApp()) {
      Router.go("download");
    }
  },
  onAfterAction: function() {
    if (Utils.getMobileOperatingSystem() === 'iOS') {
      window.location = "toasterapp://signIn";
    }
  }
});

SignUpController = AppController.extend({
  onBeforeAction: function() {
    if (!Utils.isNativeApp()) {
      Router.go("download");
    }
  },
  onAfterAction: function() {
    if (Utils.getMobileOperatingSystem() === 'iOS') {
      window.location = "toasterapp://signUp";
    }
  }
});

NotVerifiedController = AppController.extend({
});

SettingsController = AppController.extend({
  onBeforeAction: function() {
    if (!Utils.isNativeApp()) {
      Router.go("download");
    }
  }
});

NewPostController = AppController.extend({
  onBeforeAction: function() {
    if (!Utils.isNativeApp()) {
      Router.go("download");
    }
  }
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

DownloadController = AppController.extend({
});