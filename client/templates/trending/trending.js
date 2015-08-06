Template.trending.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('posts');
    this.subscription = Meteor.subscribe('comments');
    this.subscription = Meteor.subscribe('otherUserInfo');
  }.bind(this));
};

Template.trending.helpers({
  posts: function() {
    return Posts.find({}, {sort: {numLikes: -1, createdAt: -1}});
  }
});
