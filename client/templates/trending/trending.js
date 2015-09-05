TrendingPostsSub = new SubsManager();
TrendingCommentsSub = new SubsManager();

var isAtTop = function() {
  return $('.content').scrollTop() === 0;
};

Template.trending.created = function () {
  // Howon's note: we don't do dynamic loading for trending feed for now,
  // because we are only dealing with 200 threads.
  // but we still should.. however, we need a set of sorted
  // threads in place to take a portion of threads at a time.
  // Not sure how to do it at this point.

  this.autorun(function () {
    this.postsSub = TrendingPostsSub.subscribe("trendingPosts");
    this.commentsSub = TrendingCommentsSub.subscribe("comments");

    // this.postsSub = this.subscribe('trendingPosts');
    this.subscribe('otherUserInfo');
    // this.subscribe('comments');
    this.subscribe('userNetwork');
  }.bind(this));
};

Template.trending.onRendered(function() {  

  var numPosts = Posts.find().count();
  console.log("initial numPosts: " + numPosts);

  this.autorun(function () {
    var allReady = _.every([this.postsSub, this.commentsSub], function (sub) {
      return sub.ready();
    });

    if (!allReady) {  
      this.$('.posts-container').hide();
      Utils.showLoading();
    } else {
      // iOS: signal the end of Meteor loading
      if (Utils.getMobileOperatingSystem() === 'iOS') {
        setTimeout(function() {
          // This 100ms delay is important.
          // Even when the subscription is ready, we still need
          // extra time for everything to be rendered
          window.location = "toasterapp://loadingEnd";  
        }, 100);
      }
      
      this.$('.posts-container').fadeIn();
      Utils.hideLoading();

    }

  }.bind(this));

  this.autorun(function() {
    // if (isAtTop) {
    //   Session.set("newPost", undefined);
    //   // $('.new-post-alert').velocity({top: '-100%'});
    //   $('.new-post-alert.show').removeClass('show');
    // }

    // if (!isAtTop && Session.get("newPost")) {
    // // if (Session.get("newPost")) {
    //   // debugger
    //   // $('.new-post-alert').velocity({top: '0'});
    //   $('.new-post-alert').addClass('show');
    // }

    if (numPosts !== Posts.find().count() && !isAtTop) {
      numPosts = Posts.find().count();
      $('.new-post-alert').addClass('show');
    }

  });
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
