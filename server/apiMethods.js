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
  console.log("read all Notis for:", userId);

  if (!userId) {
    console.log("no userid");
    return false;
  }

  try {
    Meteor.call("readAllNotifications", userId);
    return {
      success: true 
    };
  } catch (e) {
    return e;
  }
}, {
  url: "api/notifications/readall"
});


/* 
  API call to check user verification.
  Returns true if he's verified, false otherwise.
  Make a POST request to "/api/users/verification"
  Required:
    Header: {Authorization: Bearer <token>}
    Params: {
      userId: <userId>
    }
    Returns: True, False
*/
Meteor.method("api.users.verification", function (userId) {
  var user = Meteor.users.findOne({_id: userId});

  console.log("user is verified?", userId);

  if (!user) {
    console.log("Verification no user found");
    return false;
  }

  var isVerified = user.emails[0].verified;
  return {
    isVerified: isVerified
  };
}, {
  url: "/api/users/verification",
  getArgsFromRequest: function (request) {
    var content = request.body;
    var userId = content.userId;
    return [userId];
  }
});

/* 
  API call to send a verification email
  Returns true if he's verified, false otherwise.
  Make a POST request to "/api/users/verification"
  Required:
    Header: {Authorization: Bearer <token>}
    Params: {
      email: <emailAddress>
    }
    Returns: nothing
*/
Meteor.method("api.users.sendemail", function (userId) {
  if (!userId) {
    console.log("no userID to send email to");
    return false;
  }

  var user = Meteor.users.findOne({_id: userId});
  var email = user.emails[0].address;
  console.log("Send email to:", email);

  Accounts.sendVerificationEmail(userId, email);
}, {
  url: "/api/users/sendemail",
  getArgsFromRequest: function (request) {
    var content = request.body;
    var userId = content.userId;
    return [userId];
  }
});

/* 
  API call to get network name
  Required:
    Header: {Authorization: Bearer <token>}
    Returns: networkName
*/
Meteor.method("api.users.getnetwork", function() {
  var user = Meteor.users.findOne({_id: this.userId});
  var email = user.emails[0].address;
  var networkName = Utils.getDomain(email);
  return {
    network: networkName
  };
}, {
  url: "/api/users/getnetwork",
});


// Verification
// /methods/sendVerifyingEmail