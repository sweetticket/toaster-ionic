Template._comment.helpers({
  isOP: function() {
    if (this.nameTag === "OP") {
      return "op";
    }
  },
  isMine: function() {
    return this.userId === Meteor.userId();
  }

});

Template._comment.events({
  "click .comment-item": function (e, template) {
    Router.go('posts.show', {_id: this.postId});
  }
});