Template._inlineNewComment.events({
  // "blur .inline-comment-body": function (e, template) {
  //   $('.product-detail-content').removeClass('no-scroll');
  // },

  "click .inline-comment-submit": function (e, template) {
    e.preventDefault();
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
        
        $(template.find(".inline-comment-body")).blur();
        // $('.content').stop();

        // $lastcomment = $(".comments-list .item:last-child");
        // var scrollamt = $lastcomment.offset().top + $lastcomment.height();
        
        //   $('.content').animate({
        //       scrollTop: scrollamt
        //   }, 1000); 

      });
    }
  }
});