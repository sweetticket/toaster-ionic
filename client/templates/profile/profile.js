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

Template.profile.rendered = function () {
  Session.set("profileFilter", "myToasts");
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
  },

  showToasts: function() {
    return Session.get("profileFilter") === "myToasts";
  },

  showComments: function() {
    return Session.get("profileFilter") === "myComments";
  }
});

Template.profile.events({
  "click .filter.filter-toasts": function (e, template) {
    Session.set("profileFilter", "myToasts");
    $('.filter.active').removeClass('active');
    $('.filter-toasts').addClass('active');
  },

  "click .filter.filter-comments": function (e, template) {
    Session.set("profileFilter", "myComments");
    $('.filter.active').removeClass('active');
    $('.filter-comments').addClass('active');
  }
});
