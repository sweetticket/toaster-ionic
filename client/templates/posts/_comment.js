Template._comment.events({
  "click .comment-item": function (e, template) {
    Router.go('posts.show', {_id: this.postId});
  }
});
