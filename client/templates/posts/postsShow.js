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
      console.log("postsShow not ready...")
      $(".product-detail").hide();
      // Utils.tellIOSLoadingStarted();
      // Utils.showLoading();
    } else {
      console.log("postsShow ready!")
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

Template.postsShow.events({
  'click .inline-comment-footer': function (event, template) {
    event.preventDefault();

      $lastcomment = $(".comments-list .item:last-child");

      if ($lastcomment.length > 0) {
        var scrollamt = $lastcomment.offset().top + $lastcomment.height();

        $('.content').stop().animate({
          scrollTop: '+=' + scrollamt
        }, 400);
      }     
  },
});

Template.postsShow.MoveUpCommentInput = function (keyboardHeight) {
  $('[data-keyboard-attach]').each(function (index, el) {
    setTimeout(function() {
      $(el).css({
        bottom: keyboardHeight
      })      
    }, 20)

    $('.content').css('padding-bottom', keyboardHeight);
    
    $lastcomment = $(".comments-list .item:last-child");
    if ($lastcomment.length > 0) {
      var scrollamt = $lastcomment.offset().top + $lastcomment.height();
      $('.content').velocity("scroll", {
        offset: scrollamt
      });
    }
  });
}


Template.postsShow.MoveDownCommentInput = function() {
  $('[data-keyboard-attach]').each(function (index, el) {
    $(el).velocity({
      bottom: 0
    }, {
      duration: 100
    });
    $('.content').css('padding-bottom', 0);
  });
}
