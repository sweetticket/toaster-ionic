Template._inlineNewComment.events({
  "click .inline-comment-submit": function (e, template) {
    var postId = this._id;
    var body = $(template.find(".inline-comment-body")).val();
    $(template.find(".inline-comment-body")).val("");
    Meteor.call("Comments.new", {
      postId: postId,
      body: body
    });
  }
})