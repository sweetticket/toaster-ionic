Template.trending.created = function () {
  this.autorun(function () {
    this.subscribe('otherUserInfo');
    this.subscribe('posts');
    this.subscribe('comments');

    if (!this.subscriptionsReady()) {
      Utils.showLoading();
    } else {
      Utils.hideLoading();
    }
  }.bind(this));
};

Template.trending.helpers({
  posts: function() {
    return Posts.find({}, {sort: {numLikes: -1, createdAt: -1}});
  }
});
