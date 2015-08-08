Template.postsShow.created = function () {
  this.autorun(function () {
    this.subscribe('post', Router.current().params._id);
    this.subscribe('comments');
    this.subscribe('otherUserInfo');
  }.bind(this));
  Session.set("shouldHideTabs", true);
};

Template.postsShow.onRendered(function() {
  this.autorun(function() {
    if (!this.subscriptionsReady()) {
      $(template.find(".product-detail")).hide();
      Utils.showLoading();
    } else {
      Utils.hideLoading();
      $(template.find(".product-detail")).fadeIn("fast");
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

// Template.postsShow.events({
//   'click [data-action=new-comment]': function (event, template) {
//     if (Meteor.user()) {
//       IonModal.open('newComment', {
//         postId: this._id,
//         userId: Meteor.userId()
//       });
//     }
//   }
// });