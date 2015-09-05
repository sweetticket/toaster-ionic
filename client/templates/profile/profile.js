
Template.profile.created = function () {
  this.autorun(function () {
    this.subscribe("userPostsComments");
    //FIXME: don't subscribe to all posts and comments.. need to filter
    this.subscribe('recentPosts');
    //FIXME: need this for displaying the number of comments in list view
    this.subscribe('comments');
    //FIXME: need this for displaying avatars in list view
    this.subscribe('otherUserInfo');

    if (!this.subscriptionsReady()) {
      Utils.showLoading();
    } else {
      if (Utils.getMobileOperatingSystem() === 'iOS') {
        setTimeout(function() {
          // This 100ms delay is important.
          // Even when the subscription is ready, we still need
          // extra time for everything to be rendered
          window.location = "toasterapp://loadingEnd";  
        }, 100);
      }
      
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

  //FIXME: had to add 'userId' to the .find options
  // in the helpers below because of subscription issue
  postsByUser: function() {
    return Posts.find({userId: Meteor.userId()}, {sort: {
      createdAt: -1
    }});
  },

  commentsByUser: function() {
    var postIds = _.uniq(Comments.find({userId: Meteor.userId()}, {sort: {
      createdAt: -1
    }}, {fields: {
      postId: 1
    }}).fetch().map(function(x) {
     return x.postId;
     }), true);

    var distictPostIds = [];

    $.each(postIds, function(i, el){
      if($.inArray(el, distictPostIds) === -1) distictPostIds.push(el);
    });
    return distictPostIds;
     
  },

  postFromComment: function() {
    return Posts.findOne({_id: String(this)})
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
