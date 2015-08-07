Template.profile.created = function () {
  this.autorun(function () {
    this.subscription = this.subscribe("userPostsComments");
  }.bind(this));
};

Template.profile.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.profile.helpers({
  user: function () {
    if (Meteor.userId()) {
      return Meteor.user();
    }
  },

  postsByUser: function() {
    return Posts.find({}, {sort: {
      createdAt: -1
    }});
  },

  commentsByUser: function() {
    return Comments.find({}, {sort: {
      createdAt: -1
    }});
  },

  networkDomain: function() {
    var network = Networks.findOne();
    if (network) {
      return network.domain;  
    }
  }
});
