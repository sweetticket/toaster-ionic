Template._commentVoteButton.events({
  'click .upvote-button': function (event, template) {
    event.preventDefault();
    Meteor.call('Comments.upvote', this._id, Meteor.userId());
  },
  'click .downvote-button': function (event, template) {
    event.preventDefault();
    Meteor.call('Comments.downvote', this._id, Meteor.userId());
  }
});

Template._commentVoteButton.helpers({
  hasUpvotedClass: function () {
    if (!Meteor.user()) {
      return;
    }
    var upvoters = this.upvoterIds;
    if (!upvoters) {
      return;
    }
    if(upvoters.indexOf(Meteor.userId()) >= 0) {
      return 'has-voted';
    }
  },
  hasDownvotedClass: function () {
    if (!Meteor.user()) {
      return;
    }
    var downvoters = this.downvoterIds;
    if (!downvoters) {
      return;
    }
    if(downvoters.indexOf(Meteor.userId()) >= 0) {
      return 'has-voted';
    }
  },
});
