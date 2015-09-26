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
    try {
      var newPostId = Meteor.call("Posts.new", postBody, userId);
      return Posts.findOne({_id: newPostId});
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
    

    try {
      var newCommentId = Meteor.call("Comments.new", postId, commentBody, userId);
      var comment = Comments.findOne({_id: newCommentId});
      return comment;

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

/* 
  API call to upvote a post.
  Make a POST request to "/api/posts/upvote"
  Required:
    Header: {Authorization: Bearer <token>}
    Params: {
      postId: <postId>
      userId: <userId>
    }
    Returns: +1, -1, -2
*/
Meteor.method("api.posts.upvote", function (postId) {
  var userId = this.userId;
  console.log(userId)
  if (!userId) {
    console.log("no userid");
    return "no userId"
  }

  try {
    var diff = Meteor.call("Posts.upvote", postId, userId);
    return {
      diffVotes: diff 
    };
  } catch (e) {
    return e;
  }
}, {
  url: "api/posts/upvote",
  getArgsFromRequest: function (request) {
    var content = request.body;
    var postId = content.postId;
    return [postId];
  }
});

/* 
  API call to downvote a post.
  Make a POST request to "/api/posts/downvote"
  Required:
    Header: {Authorization: Bearer <token>}
    Params: {
      postId: <postId>
    }
    Returns: +1, -1, -2
*/
Meteor.method("api.posts.downvote", function (postId) {
  var userId = this.userId;
  console.log(userId)
  if (!userId) {
    console.log("no userid");
    return "no userId"
  }

  try {
    var diff = Meteor.call("Posts.downvote", postId, userId);
    return {
      diffVotes: diff 
    };
  } catch (e) {
    return e;
  }
}, {
  url: "api/posts/downvote",
  getArgsFromRequest: function (request) {
    var content = request.body;
    var postId = content.postId;
    return [postId];
  }
});

/* API call to upvote a comment */
Meteor.method("api.comments.upvote", function (commentId) {
  var userId = this.userId;

  if (!userId) {
    console.log("no userid");
    return "no userId"
  }

  try {
    var diff = Meteor.call("Comments.upvote", commentId, userId);
    return {
      diffVotes: diff 
    };
  } catch (e) {
    return e;
  }
}, {
  url: "api/comments/upvote",
  getArgsFromRequest: function (request) {
    var content = request.body;
    var commentId = content.commentId;
    return [commentId];
  }
});

/* API call to downvote a comment */
Meteor.method("api.comments.downvote", function (commentId) {
  var userId = this.userId;
  console.log(userId)
  if (!userId) {
    console.log("no userid");
    return "no userId"
  }

  try {
    var diff = Meteor.call("Comments.downvote", commentId, userId);
    return {
      diffVotes: diff 
    };
  } catch (e) {
    return e;
  }
}, {
  url: "api/comments/downvote",
  getArgsFromRequest: function (request) {
    var content = request.body;
    var commentId = content.commentId;
    return [commentId];
  }
});

/* API call to get number of unread notifications */
Meteor.method("api.notifications.getnumunread", function () {
  var userId = this.userId;
  console.log(userId)
  if (!userId) {
    console.log("no userid");
    return "no userId"
  }

  try {
    var numUnread = Meteor.call("getNumUnreadNotis", userId);
    return {
      numUnread: numUnread 
    };
  } catch (e) {
    return e;
  }
}, {
  url: "api/notifications/getnumunread",
  getArgsFromRequest: function (request) {
    var content = request.body;
    var userId = content.userId;
    return [userId];
  }
});

/* API call to read all notifications */
Meteor.method("api.notifications.readall", function () {
  var userId = this.userId;
  console.log(userId)
  if (!userId) {
    console.log("no userid");
    return "no userId"
  }

  try {
    // Meteor.call("readAllNotifications", function() {
    //   return {
    //     success: true 
    //   };
    // });
    Meteor.call("readAllNotifications");
    return {
      success: true 
    };
  } catch (e) {
    return e;
  }
}, {
  url: "api/notifications/readall",
  getArgsFromRequest: function (request) {
    var content = request.body;
    var userId = content.userId;
    return [userId];
  }
});




