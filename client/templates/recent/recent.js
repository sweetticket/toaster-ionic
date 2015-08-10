Template.recent.created = function () {
  // flag to show the loading wheel only in the beginning.
  // don't show a loading wheel for subsequent fetch calls
  this.initialLoaded = false;

  this.loaded = new ReactiveVar(0);
  this.numPostsFetched = new ReactiveVar(NUM_POSTS_IN_BATCH);

  this.autorun(function () {
    var limit = this.numPostsFetched.get();
    this.postsSub = this.subscribe('recentPosts', limit);
    if (this.postsSub.ready()) {
      this.loaded.set(limit);
      this.initialLoaded = true;
    }

    this.subscribe('otherUserInfo');
    this.subscribe('comments');
    this.subscribe('userNetwork');
  }.bind(this));
};

Template.recent.onRendered(function() {
  var limit = this.numPostsFetched.get();
  var instance = this;

  this.autorun(function () {
    // if (!this.subscriptionsReady() && !this.initialLoaded) {
    if (!this.postsSub.ready() && !this.initialLoaded) {
      this.$('.posts-container').hide();
      Utils.showLoading();
      Session.set("ready", false);
    } else {
      this.$('.posts-container').fadeIn();
      Utils.hideLoading();
      Session.set("ready", true);
    }
  }.bind(this));

  var fetchMorePosts = _.throttle(function() {
    limit += NUM_POSTS_IN_BATCH;
    instance.numPostsFetched.set(limit);
  }, 100);

  // scroll
  $(document).on("scroll touchmove", (function (e) {
    var $target = $('.post-end-mark');
    if ($target.length > 0) {
      var distanceY = $('.overflow-scroll').scrollTop();
      var epsilon = 200;
      var threshold = distanceY+$(document).height()+epsilon;
      if ($target.offset().top < threshold) {
        fetchMorePosts();
      }
    }
  }));
});

Template.recent.helpers({
  posts: function () {
    return Posts.find({}, {
      sort: {createdAt: -1},
      limit: Template.instance().loaded.get()
    });
  },
  userRep: function() {
    if (Meteor.user()) {
      return Meteor.user().rep;
    }
    return;
  }
});
