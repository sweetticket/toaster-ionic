Template.recent.created = function () {
  // flag to show the loading wheel only in the beginning.
  // don't show a loading wheel for subsequent fetch calls
  this.initialLoaded = false;

  this.loaded = new ReactiveVar(0);
  this.numPostsFetched = new ReactiveVar(NUM_POSTS_IN_BATCH);

  this.autorun(function () {
    var limit = this.numPostsFetched.get();
    var postsSub = this.subscribe('recentPosts', limit);
    if (postsSub.ready()) {
      this.loaded.set(limit);
      this.initialLoaded = true;
    }

    this.subscribe('otherUserInfo');
    this.subscribe('comments');
  }.bind(this));
};

Template.recent.onRendered(function() {
  var limit = this.numPostsFetched.get();
  var instance = this;

  this.autorun(function () {
    if (!this.subscriptionsReady() && !this.initialLoaded) {
      this.$('.posts-container').hide();
      Utils.showLoading();
    } else {
      this.$('.posts-container').fadeIn();
      Utils.hideLoading();
    }
  }.bind(this));

  var fetchMorePosts = _.throttle(function() {
    limit += NUM_POSTS_IN_BATCH;
    instance.numPostsFetched.set(limit);
  }, 100);

  // scroll
  $(document).on("scroll touchmove", (function (e) {
    var distanceY = $('.overflow-scroll').scrollTop();
    var $target = $('.post-end-mark');
    var epsilon = 200;
    var threshold = distanceY+$(document).height()+epsilon;
    if ($target.offset().top < threshold) {
      fetchMorePosts();
    }
  }));

});

Template.recent.helpers({
  posts: function () {
    return Posts.find({}, {
      sort: {createdAt: -1},
      limit: Template.instance().loaded.get()
    });
  }
});
