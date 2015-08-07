var ranking = function(post) {
  var now = moment();

  //FIXME: REPLACE WITH DAYS BEFORE RELEASE (?). DOESNT SEEM TO WORK VERY WELL WITH
  //POSTS THAT ARE CLOSE IN TIME (ie. within the same day --> appear in order of
    // oldest to newest (opposite of "recent")))
  var numHours = now.diff(post.createdAt, 'hours');
  // console.log("ranking for ["+post.body+"]: " + post.numLikes * (1.0 / Math.pow(numDays+1,2.0)));
  return post.numLikes * (1.0 / Math.pow(numHours+1,2.0));

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
