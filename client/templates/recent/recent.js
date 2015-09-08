var isAtTop = function() {
  return $('.content').scrollTop() === 0;
};

RecentPostsSub = new SubsManager();
// RecentCommentsSub = new SubsManager();

Template.recent.created = function () {
  // flag to show the loading wheel only in the beginning.
  // don't show a loading wheel for subsequent fetch calls
  this.initialLoaded = false;
  this.loaded = new ReactiveVar(0);
  this.numPostsFetched = new ReactiveVar(NUM_POSTS_IN_BATCH);

  //TODO: do we really need info of all users in this network here??
  this.subscribe('otherUserInfo');
  // this.subscribe('userNetwork');

  this.autorun(function () {
    var limit = this.numPostsFetched.get();
    this.postsSub = RecentPostsSub.subscribe('recentPostsAndComments');

    if (this.postsSub.ready()) {
      this.loaded.set(limit);
    }
  }.bind(this));
};

Template.recent.onRendered(function() {
  var limit = this.numPostsFetched.get();
  var instance = this;
  var numPosts = Posts.find().count();

  this.autorun(function () {
    if (!this.postsSub.ready()) {
      // iOS: signal the start of Meteor loading
      console.log("should tell ios loading started")
      Utils.tellIOSLoadingStarted();

      this.$('.posts-container').hide();

      //HOWON: TEMPORARILY DSIABLING LOADING WHEEL
      // Utils.showLoading();
      Session.set("ready", false);
    } else {
      // iOS: signal the end of Meteor loading
      console.log("should tell ios loading ended")
      Utils.tellIOSLoadingEnded();

      Utils.tellAndroidLoadingEnded();
      this.$('.posts-container').fadeIn();

      //HOWON: TEMPORARILY DSIABLING LOADING WHEEL
      // Utils.hideLoading();
      Session.set("ready", true);
    }
  }.bind(this));

  var fetchMorePosts = _.throttle(function() {
    limit += NUM_POSTS_IN_BATCH;
    instance.numPostsFetched.set(limit);
  }, 200, {
    trailing: false
  });

  // scroll
  $(".overflow-scroll").on("scroll touchmove", (function (e) {
    var $target = $('.post-end-mark');
    if ($target.length > 0) {
      var distanceY = $('.overflow-scroll').scrollTop();

      // var gapFromTheBottom = 300;
      var gapFromTheBottom = 0;

      var threshold = distanceY + $(document).height() + gapFromTheBottom;
      if ($target.position().top < threshold) {
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
  },

  morePostsAvailable: function() {
    console.log("available: ", Posts.find().count(), "loaded:", Template.instance().loaded.get());
    return Posts.find().count() > Template.instance().loaded.get();
  }
});
