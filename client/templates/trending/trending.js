Template.trending.created = function () {
  // Howon's note: we don't do dynamic loading for trending feed for now,
  // because we are only dealing with 200 threads.
  // but we still should.. however, we need a set of sorted
  // threads in place to take a portion of threads at a time.
  // Not sure how to do it at this point.

  this.autorun(function () {
    this.postsSub = this.subscribe('trendingPosts');
    this.subscribe('otherUserInfo');
    this.subscribe('comments');
  }.bind(this));
};

Template.trending.onRendered(function() {
  this.autorun(function () {
    // if (!this.subscriptionsReady() && !this.initialLoaded) {
    if (!this.postsSub.ready()) {  
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
    var postsArr = Posts.find({}).fetch();
    postsArr.sort(Utils.compareRank);
    return postsArr;
  }
});
