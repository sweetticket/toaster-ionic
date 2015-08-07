Template.profile.created = function () {
  this.autorun(function () {
    this.subscribe("userPostsComments");

    if (!this.subscriptionsReady()) {
      Utils.showLoading();
    } else {
      Utils.hideLoading();
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

  postFromComment: function() {
    return Posts.findOne({_id: this.postId});
  },

  networkDomain: function() {
    var network = Networks.findOne();
    if (network) {
      return network.domain;  
    }
  }
});
