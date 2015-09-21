/* 
  API call to make a new post.
  Make a POST request to "/api/posts/new"
  Required:
    Header: {Authorization: Bearer <token>}
    Params: {postBody: <postBody>}
*/

Meteor.method("api.posts.new", function (postBody) {
  console.log("POSTING:", postBody);
  if (postBody.length > 0) {
    var userId = this.userId;
    var newPostId;
    try {
      newPostId = Meteor.call("Posts.new", postBody, userId);
    } catch (e) {
      return e;
    }

    console.log("Post created:", newPostId);

    return {postId: newPostId};
  }
}, {
  url: "api/posts/new",
  getArgsFromRequest: function (request) {
    var content = request.body;
    var postBody = content.postBody;
    return [postBody];
  }
});

/* 
  API call to make a new comment.
  Make a POST request to "/api/comments/new"
  Required:
    Header: {Authorization: Bearer <token>}
    Params: {
      postId: <idOfThePostThatIamCommentingOn>
      commentBody: <commentBody>
    }
*/
Meteor.method("api.comments.new", function (postId, commentBody) {
  console.log("COMMENTING:", commentBody);

  if (commentBody.length > 0) {
    var userId = this.userId;
    var newCommentId;

    try {
      newCommentId = Meteor.call("Comments.new", postId, commentBody, userId);
    } catch (e) {
      return e;
    }

    console.log("Comment created:", newCommentId);
    return {commentId: newCommentId};
  }
}, {
  url: "api/comments/new",
  getArgsFromRequest: function (request) {
    var content = request.body;
    var postId = content.postId;
    var commentBody = content.commentBody;
    return [postId, commentBody];
  }
});
