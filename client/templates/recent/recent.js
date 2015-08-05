Template.recent.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('posts');
    this.subscription = Meteor.subscribe('comments');
  }.bind(this));
};

Template.recent.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.recent.helpers({
  posts: function () {
    return Posts.find({}, {sort: {createdAt: -1}});
  }
});
