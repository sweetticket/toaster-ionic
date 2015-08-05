Template.trending.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('posts');
  }.bind(this));
};

Template.trending.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.trending.helpers({
  posts: function () {
    return Posts.find({}, {sort: {numLikes: -1, createdAt: -1}});
  }
});
