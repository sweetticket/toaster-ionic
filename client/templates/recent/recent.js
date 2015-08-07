Template.recent.created = function () {
  this.autorun(function () {
    this.subscribe('otherUserInfo');
    this.subscribe('posts');
    this.subscribe('comments');

    if (!this.subscriptionsReady()) {
      this.$('.posts-container').hide();
      Utils.showLoading();
    } else {
      this.$('.posts-container').hide();
      Utils.hideLoading();
    }
  }.bind(this));
};


Template.recent.helpers({
  posts: function () {
    return Posts.find({}, {sort: {createdAt: -1}});
  }
});
