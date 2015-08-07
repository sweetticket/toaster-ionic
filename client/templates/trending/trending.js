Template.trending.created = function () {
  this.autorun(function () {
    this.subscribe('otherUserInfo');
    this.subscribe('posts');
    this.subscribe('comments');
  }.bind(this));
};

Template.trending.onRendered(function() {
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

Template.trending.helpers({
  posts: function() {
    return Posts.find({}, {sort: {numLikes: -1, createdAt: -1}});
  }
});
