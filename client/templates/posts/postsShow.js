Template.postsShow.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('post', Router.current().params._id);
  }.bind(this));
};

Template.postsShow.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.postsShow.helpers({
  post: function () {
    return Posts.findOne({_id: Router.current().params._id});
  },

  comments: function () {
    return Comments.find({postId: Router.current().params._id}, {sort: {createdAt: -1}});
  }
});

Template.postsShow.events({
  'click [data-action=new-comment]': function (event, template) {
    debugger
    if (Meteor.user()) {
      IonModal.open('newComment', {postId: this._id});
    } else {
      IonModal.open('signIn');
    }
  }
});
