Template.trending.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('posts');
    this.subscription = Meteor.subscribe('comments');
    this.subscription = Meteor.subscribe('otherUserInfo');
  }.bind(this));
};

Template.trending.rendered = function () {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    IonModal.open('signUp');
  }

  // FIXME: infinite loading on the phone for some reason?
  // this.autorun(function () {
  //   if (!this.subscription.ready()) {
  //     IonLoading.show();
  //   } else {
  //     IonLoading.hide();
  //   }
  // }.bind(this));
};

Template.trending.helpers({
  posts: function() {
    return Posts.find({}, {sort: {numLikes: -1, createdAt: -1}});
  }
});
