var isAtTop = function() {
  return $('.content').scrollTop() === 0;
};

RecentPostsSub = new SubsManager();
RecentCommentsSub = new SubsManager();

Template.recent.created = function () {
  // flag to show the loading wheel only in the beginning.
  // don't show a loading wheel for subsequent fetch calls
  this.initialLoaded = false;

  this.loaded = new ReactiveVar(0);
  // this.ready = new ReactiveVar();
  this.numPostsFetched = new ReactiveVar(NUM_POSTS_IN_BATCH);

  this.autorun(function () {
    var limit = this.numPostsFetched.get();
    this.postsSub = RecentPostsSub.subscribe('recentPosts', limit);
    this.commentsSub = RecentCommentsSub.subscribe('comments');

    if (this.postsSub.ready() && this.commentsSub.ready()) {
      this.loaded.set(limit);
      this.initialLoaded = true;
    }
    
    this.subscribe('otherUserInfo');
    // this.subscribe('comments');
    this.subscribe('userNetwork');
  }.bind(this));
};

Template.recent.onRendered(function() {
  var limit = this.numPostsFetched.get();
  var instance = this;

  var numPosts = Posts.find().count();
  console.log("initial numPosts: " + numPosts);

  this.autorun(function () {
    var allReady = _.every([this.postsSub, this.commentsSub], function (sub) {
      return sub.ready();
    });

    if (!allReady && !this.initialLoaded) {
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

  this.autorun(function() {
    if (numPosts !== Posts.find().count() && !isAtTop) {
      debugger
      numPosts = Posts.find().count();
      $('.new-post-alert').addClass('show');
    }
  });

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
