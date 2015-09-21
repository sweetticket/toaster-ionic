/* 
  API call to make a new post.
  Make a POST request to "/api/posts/new"
  Required:
    Header: {Authorization: Bearer <token>}
    Params: {postBody: <postBody>}
*/

Meteor.method("api.posts.new", function (postBody) {
  console.log(postBody);
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
