

Template.postsShow.created = function () {
  this.autorun(function () {
    this.postSub = this.subscribe('post', Router.current().params._id);
    this.commentSub = this.subscribe('comments');
    this.userSub = this.subscribe('otherUserInfo');
  }.bind(this));
  Session.set("shouldHideTabs", true);
};

Template.postsShow.onRendered(function() {
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
      // $(".product-detail").hide();
      Utils.showLoading();
    } else {
      Utils.hideLoading();
      // $(".product-detail").fadeIn("fast");
    }
  }.bind(this));
})

Template.postsShow.onDestroyed(function() {
  Session.set("shouldHideTabs", false);
});

Template.postsShow.helpers({
  post: function () {
    return Posts.findOne({_id: Router.current().params._id});
  },

  comments: function () {
    return Comments.find({postId: Router.current().params._id}, {sort: {createdAt: 1}});
  },
});

Template.postsShow.events({
  'click .inline-comment-footer': function (event, template) {
    event.preventDefault();

      $('.inline-comment-body').focus();
      // debugger
      $lastcomment = $(".comments-list .item:last-child");
      var scrollamt = $lastcomment.offset().top + $lastcomment.height();
      
        $('.content').stop().animate({
            scrollTop: '+=' + scrollamt
        }, 1000); 
      }
});