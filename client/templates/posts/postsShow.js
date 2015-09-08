function notInView(element){
    var offset = element.offset().top - $(window).scrollTop();
    
    return offset > window.innerHeight;
};

Template.postsShow.created = function () {
  this.autorun(function () {
    this.postSub = this.subscribe('post', Router.current().params._id);
    this.commentSub = this.subscribe('comments');
    this.userSub = this.subscribe('otherUserInfo');
  }.bind(this));

  Session.set("shouldHideTabs", true);
};

Template.postsShow.onRendered(function() {
  
  //tell iOS wrapper that we should move to a different ViewController
  _.defer(function() {
    console.log("post show rendered");
    if (Utils.getMobileOperatingSystem() === 'iOS') {
      window.location = "toasterapp://postsShow";
    }    
  })

  this.autorun(function() {
    if (!this.postSub.ready()) {
      $('.product-detail').hide();
    } else {
      $('.product-detail').show();
    }

    if (!this.commentSub.ready()) {
      $('.comments-list').hide();
    } else {
      $('.comments-list').show();
    }

    if (!this.subscriptionsReady()) {
      $(".product-detail").hide();
      // Utils.tellIOSLoadingStarted();
      // Utils.showLoading();
    } else {
      Utils.tellAndroidLoadingEnded();
      Utils.tellIOSLoadingEnded();
      // Utils.hideLoading();
      $(".product-detail").fadeIn("fast");
    }
  }.bind(this));
})

Template.postsShow.onDestroyed(function() {
  // console.log("onDestroyed");
  // Utils.tellIOSLoadingEnded(0);
  Session.set("shouldHideTabs", false);
});

Template.postsShow.helpers({
  post: function() {
    return Posts.findOne({_id: Router.current().params._id});
  },

  comments: function() {
    return Comments.find({postId: Router.current().params._id}, {sort: {createdAt: 1}});
  },

  isPlural: function() {
    return Comments.find({postId: this._id}).count() !== 1;
  },

  isMyPost: function() {
    return this.userId === Meteor.userId();
  },

});

Template.postsShow.MoveUpCommentInput = function (keyboardHeight) {
  var $commentInput = $('.inline-comment-footer');
  var paddingAmt = keyboardHeight;
  $commentInput.css('padding-bottom', paddingAmt);
}

//FIXME: not working yet
Template.postsShow.MoveDownToLastComment = function() {
  console.log("move down to last comment");
  $lastcomment = $(".comments-list .item:last-child");
  if ($lastcomment.length > 0) {
    var scrollamt = $lastcomment.offset().top + $lastcomment.height();
    $('.content').velocity("scroll", {
      offset: scrollamt + keyboardHeight
    });
  }
}

Template.postsShow.MoveDownCommentInput = function() {
  var $commentInput = $('.inline-comment-footer');
  $commentInput.css('padding-bottom', 0);
}
