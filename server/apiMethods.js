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
    console.log("gonna return", newPostId);

    return {postId: newPostId};

    // return newPostId;
  }
}, {
  url: "api/posts/new",
  getArgsFromRequest: function (request) {
    var content = request.body;
    var postBody = content.postBody;
    return [postBody];
  }
});

