var ranking = function(post) {

  /* Score = P / (T+2)^G
  P = points of an item (can subtract 1 to negate submitters vote if you want)
  T = time since submission (in hours)
  G = Gravity, ie. 1.8
  */
  var now = moment();

  var T = now.diff(post.createdAt, 'hours');
  var P = post.numLikes;
  var G = 1.8;
  return P / Math.pow(T+2, G);
  }

var compareRankings = function(a,b) {
  if (ranking(a) > ranking(b))
    return -1;
  if (ranking(a) < ranking(b))
    return 1;
  return 0;
}

Template.trending.created = function () {
  this.autorun(function () {
    this.subscribe('otherUserInfo');
    this.subscribe('posts');
    this.subscribe('comments');
  }.bind(this));
};

Template.trending.onRendered(function() {
  this.autorun(function () {
    if (!this.subscriptionsReady()) {
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
    postsArr.sort(compareRankings);
    return postsArr;
  }
});
