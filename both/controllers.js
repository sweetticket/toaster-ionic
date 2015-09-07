var isLoggedIn = function() {
  // console.log("JENYNYNYNY");
  // console.log(Meteor.loggingIn());
  // console.log(Meteor.user());
  if (!Meteor.loggingIn() && !Meteor.user()) {
    if (Meteor.isClient) {
      // if (Router.current().route._path === '/trending' && Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
      if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
        alert('start-signup');
      }
    }
    Router.go('signUp');
    this.next();
  } else {
    //FIXME: EMAIL VERIFICATION TURNED OFF
    // isVerified.call(this);
    this.next();
  }
}

var isVerified = function() {
  var user = Meteor.user();
  if (user) {
    if (user.emails[0].verified) {
      this.next();
    } else {
      Router.go("notVerified");
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
  },

  // onAfterAction: function() {
  //   if (Utils.getMobileOperatingSystem() === 'iOS') {
  //     window.location = "toasterapp://trending";
  //   }
  // }
});

RecentController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
    // isVerified.call(this);
  },

  // onAfterAction: function() {
  //   if (Utils.getMobileOperatingSystem() === 'iOS') {
  //     window.location = "toasterapp://recent";
  //   }
  // }
});

PostsShowController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
  },


  // onAfterAction: function() {
  //   if (Utils.getMobileOperatingSystem() === 'iOS') {
  //     window.location = "toasterapp://postsShow";
  //   }
  // }
});

UsersShowController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
  }
});

NotificationsController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
  },

  // onAfterAction: function() {
  //   if (Utils.getMobileOperatingSystem() === 'iOS') {
  //     window.location = "toasterapp://notifications";
  //   }
  // }
});

ProfileController = AppController.extend({
  onBeforeAction: function() {
    isLoggedIn.call(this);
  },

  // onAfterAction: function() {
  //   if (Utils.getMobileOperatingSystem() === 'iOS') {
  //     window.location = "toasterapp://profile";
  //   }
  // }
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