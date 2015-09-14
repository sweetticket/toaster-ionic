RecentPostsSub = new SubsManager();

Template.recent.badgeSet = false;
Template.recent.skipIncrease = true;

Template.recent.onCreated(function() {
  // flag to show the loading wheel only in the beginning.
  // don't show a loading wheel for subsequent fetch calls
  this.loaded = new ReactiveVar(0);
  this.numPostsToFetch = new ReactiveVar(NUM_POSTS_IN_BATCH);

  //FIXME: do we really need info of all users in this network here??
  this.subscribe('otherUserInfo');

  this.autorun(function () {
    var limit = this.numPostsToFetch.get();
    this.postsSub = RecentPostsSub.subscribe('recentPostsAndComments', limit);

    if (this.postsSub.ready()) {
      this.loaded.set(limit);
    }
  }.bind(this));
});

Template.recent.onRendered(function() {
  var instance = this;
  var limit = this.numPostsToFetch.get();

  // ios badge count update
  if (Utils.getMobileOperatingSystem() === 'iOS') {
    Meteor.call("getNumUnreadNotis", Meteor.userId(), function (err, numUnread) {
      Utils.tellIOSToUpdateBadgeCount(numUnread);
    });
  }

  // Android badge count update inside autorun
  if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === "Android") {
    Tracker.autorun(function() {
      Meteor.subscribe("myNotiCount");
      Counts.get("notiCount");
      Meteor.call("getNumUnreadNotis", Meteor.userId(), function (err, numUnread) {
        Utils.tellAndroidToSetBadgeCount(numUnread);
      });
    });
  }

  this.autorun(function () {
    if (!this.postsSub.ready()) {
      Utils.tellIOSLoadingStarted();
      this.$('.posts-container').hide();
    } else {
      Utils.tellIOSLoadingEnded();
      Utils.tellAndroidLoadingEnded();
      this.$('.posts-container').fadeIn();
    }
  }.bind(this));

  var fetchMorePosts = _.throttle(function() {
    limit += NUM_POSTS_IN_BATCH;
    instance.numPostsToFetch.set(limit);
    console.log("fetchMorePosts:", limit);
  }, 500, {
    trailing: false
  });

  // scroll
  $(".overflow-scroll").on("scroll touchmove", (function (e) {
    var $target = $('.post-end-mark');
    if ($target.length > 0) {
      var distanceY = $('.overflow-scroll').scrollTop();
      var threshold = distanceY + $(document).height();
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

  morePostsAvailable: function() {
    var numPublished = Posts.find().count();
    var numLoaded = Template.instance().loaded.get();
    console.log("available: ", numPublished, "loaded:", numLoaded);
    return numPublished >= numLoaded;
  },

  doPostsExist: function() {
    return Posts.find().count() > 0;
  }
});
