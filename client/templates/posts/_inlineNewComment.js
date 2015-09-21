Template._inlineNewComment.events({
  "click .inline-comment-submit": function (e, template) {
    e.preventDefault();
    var postId = this._id;
    var authorId = this.userId;
    var body = $(template.find(".inline-comment-body")).val().trim();
    var userId = Meteor.userId()

    if (body.length > 0) {
      $(template.find(".inline-comment-body")).val("");

      Meteor.call("Comments.new", postId, body, userId, function() {
        // scroll to bottom when the new comment is created
        $(template.find(".inline-comment-body")).blur();
        ga('send', 'event', 'comment', 'submit', {
          network: Networks.findOne().domain,
          msg: body
        });
      });
    }
  }
});
