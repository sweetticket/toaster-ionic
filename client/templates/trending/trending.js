Template.trending.created = function () {
  this.loaded = new ReactiveVar(0);
  this.numPostsFetched = new ReactiveVar(NUM_POSTS_IN_BATCH);

  this.autorun(function () {
    var limit = this.numPostsFetched.get();
    var postsSub = this.subscribe('trendingPosts', limit);
    if (postsSub.ready()) {
      console.log("received "+limit+"trending posts");
      this.loaded.set(limit);
    }

    this.subscribe('otherUserInfo');
    this.subscribe('comments');
  }.bind(this));
};

Template.trending.onRendered(function() {
  var instance = this;
  var limit = this.numPostsFetched.get();

  this.autorun(function () {
    if (!this.subscriptionsReady()) {
      this.$('.posts-container').hide();
      Utils.showLoading();
    } else {
      this.$('.posts-container').fadeIn();
      Utils.hideLoading();
    }
  }.bind(this));

  // scroll
  $(window).on("scroll touchmove touchend", (function (e) {
    console.log($(window).scrollTop());
    var $target = $('.post-end-mark');
    if (!$target) { return false; }

    var threshold = $(window).scrollTop()+$(window).height();
    if ($target.offset().top < threshold) {
      console.log("load more");
      limit += NUM_POSTS_IN_BATCH;
      instance.numPostsFetched.set(limit);
    }
  }));
});

Template.trending.helpers({
  posts: function() {
    console.log("posts helper called");
    var postsArr = Posts.find({},
      {limit: Template.instance().loaded.get()}).fetch();
    postsArr.sort(Utils.compareRank);
    return postsArr;
  }
});
