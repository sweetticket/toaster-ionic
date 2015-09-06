Template.usersShow.created = function () {
  this.autorun(function () {
    this.subscribe('user', Router.current().params._id);

    if (!this.subscriptionsReady()) {
      // Utils.showLoading();
    } else {
      // Utils.hideLoading();
    }
  }.bind(this));
};

Template.usersShow.helpers({
  user: function () {
    return Meteor.users.findOne({_id: Router.current().params._id});
  }
});
