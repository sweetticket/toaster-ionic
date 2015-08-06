Template.recent.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('posts');
    this.subscription = Meteor.subscribe('comments');
    this.subscription = Meteor.subscribe('otherUserInfo');
  }.bind(this));
};

Template.recent.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      this.$('.posts-container').hide();
      IonLoading.show();
    } else {
      IonLoading.hide();
      this.$('.posts-container').fadeIn();
    }
  }.bind(this));
};

Template.recent.helpers({
  posts: function () {
    return Posts.find({}, {sort: {createdAt: -1}});
  }
});
