Template.recent.created = function () {
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


Template.recent.helpers({
  posts: function () {
    return Posts.find({}, {sort: {createdAt: -1}});
  }
});
