var requireLogin = function() {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    Router.go('signIn');
  } else {
    this.next();
  }
}

AppController = RouteController.extend({
  layoutTemplate: 'appLayout'
});

TrendingController = AppController.extend({
  onBeforeAction: function() {
    requireLogin.call(this);
  }
});

RecentController = AppController.extend({
  onBeforeAction: function() {
    requireLogin.call(this);
  }
});

PostsShowController = AppController.extend({
  onBeforeAction: function() {
    requireLogin.call(this);
  }
});

UsersShowController = AppController.extend({
  onBeforeAction: function() {
    requireLogin.call(this);
  }
});

NotificationsController = AppController.extend({
  onBeforeAction: function() {
    requireLogin.call(this);
  }
});

ProfileController = AppController.extend({
  onBeforeAction: function() {
    requireLogin.call(this);
  }
});

SignInController = AppController.extend({
});

SignUpController = AppController.extend({
});