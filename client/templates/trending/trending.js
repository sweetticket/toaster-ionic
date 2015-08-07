Template.trending.created = function () {
  this.autorun(function () {
    this.subscriptions = [
      Meteor.subscribe('otherUserInfo'),
      Meteor.subscribe('posts'),
      Meteor.subscribe('comments')
    ];
  }.bind(this));
};

Template.trending.onRendered(function() {
  this.autorun(function () {
    var allReady = _.every(this.subscriptions, function (subscription) {
      return subscription.ready();
    });
    if (!allReady) {
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
