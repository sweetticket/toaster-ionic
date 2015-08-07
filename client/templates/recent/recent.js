Template.recent.created = function () {
  this.autorun(function () {
    this.subscribe('otherUserInfo');
    this.subscribe('posts');
    this.subscribe('comments');
  }.bind(this));
};

Template.recent.onRendered(function() {
  this.autorun(function () {
    if (!this.subscriptionsReady()) {
      this.$('.posts-container').hide();
      Utils.showLoading();
    } else {
      this.$('.posts-container').fadeIn();
      Utils.hideLoading();
    }
  }.bind(this));
});

Template.recent.helpers({
  posts: function () {
    return Posts.find({}, {sort: {createdAt: -1}});
  }
});
