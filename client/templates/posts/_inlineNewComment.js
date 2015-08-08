Template._inlineNewComment.events({
  "click .inline-comment-submit": function (e, template) {
    var postId = this._id;
    var authorId = this.userId;
    var body = $(template.find(".inline-comment-body")).val().trim();

    if (body.length > 0) {
      $(template.find(".inline-comment-body")).val("");
      Meteor.call("Comments.new", {
        postId: postId,
        body: body,
        authorId: authorId
      }, function() {
        // scroll to bottom when the new comment is created
        window.scrollTo(0, document.body.scrollHeight);
        $(template.find(".inline-comment-body")).blur();
      });
    }
  }
});