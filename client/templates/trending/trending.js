Template.trending.created = function () {
  this.autorun(function () {
    // FIXME: WAIT??? shouldn't it be an array??
    this.subscription = Meteor.subscribe('posts');
    this.subscription = Meteor.subscribe('comments');
    this.subscription = Meteor.subscribe('otherUserInfo');
  }.bind(this));
};

Template.trending.onRendered(function() {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      this.$('.posts-container').hide();
      IonLoading.show();
    } else {
      IonLoading.hide();
      this.$('.posts-container').fadeIn();
    }
  }.bind(this));
});

Template.trending.helpers({
  posts: function() {
    return Posts.find({}, {sort: {numLikes: -1, createdAt: -1}});
  }
});
