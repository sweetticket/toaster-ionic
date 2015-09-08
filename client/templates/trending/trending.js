TrendingPostsSub = new SubsManager();
TrendingCommentsSub = new SubsManager();

var isAtTop = function() {
  return $('.content').scrollTop() === 0;
};

Template.trending.created = function () {
  // Howon's note: we don't do dynamic loading for trending feed for now,
  // because we are only dealing with 100 threads.
  // but we still should.. however, we need a set of sorted
  // threads in place to take a portion of threads at a time.
  // Not sure how to do it at this point.

  this.subscribe('otherUserInfo');
  // this.subscribe('userNetwork');

  this.autorun(function () {
    this.postsSub = TrendingPostsSub.subscribe("trendingPostsAndComments");
  }.bind(this));
};

Template.trending.onRendered(function() {  
  var numPosts = Posts.find().count();

  this.autorun(function () {

    if (!this.postsSub.ready()) {  
      this.$('.posts-container').hide();

      //HOWON: TEMPORARILY DSIABLING LOADING WHEEL
      // Utils.showLoading();
    } else {
      //Tell ios that loading ended
      Utils.tellIOSLoadingEnded();

      //Tell Android that loading ended
      Utils.tellAndroidLoadingEnded();

      this.$('.posts-container').fadeIn();

      //HOWON: TEMPORARILY DSIABLING LOADING WHEEL
      // Utils.hideLoading();
    }

  }.bind(this));
});

Template.trending.helpers({
  posts: function() {
    var postsArr = Posts.find({}).fetch();
    postsArr.sort(Utils.compareRank);
    return postsArr;
  },
  userRep: function() {
    if (Meteor.user()){
      return Meteor.user().rep;
    }
    return;
  }
});
