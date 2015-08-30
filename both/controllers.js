var isLoggedIn = function() {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    Router.go('signUp');
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
  }
});

NewPostController = AppController.extend({
})

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
});

SignUpController = AppController.extend({
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