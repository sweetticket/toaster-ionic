Template.recent.created = function () {
  this.autorun(function () {
    this.subscriptions = [
      this.subscribe('otherUserInfo'),
      this.subscribe('posts'),
      this.subscribe('comments')
    ];
  }.bind(this));
};

Template.recent.rendered = function () {
  this.autorun(function () {
    var allReady = _.every(this.subscriptions, function (subscription) {
      return subscription.ready();
    });

    if (!allReady) {
      this.$('.posts-container').hide();
      IonLoading.show();
    } else {
      console.log("recent all ready");
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
