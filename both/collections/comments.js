Comments = new Mongo.Collection('comments');

Comments.helpers({
  author: function () {
    return Meteor.users.findOne({_id: this.userId});
  },
});

Meteor.methods({
  "Comments.new": function (info) {
    var authorId = info.authorId;
    var user = Meteor.users.findOne({_id: this.userId});
    // console.log("userId", user._id);
    // console.log("userRep", user.rep);
    Comments.insert({
      postId: info.postId,
      body: info.body,
      userId: this.userId,
      networkId: user.networkId,
      createdAt: new Date()
    }, function () {

      var author = Meteor.users.findOne({_id: authorId});
      var incAuthor = Math.floor(Math.random() * (7 - 2)) + 2; // random int between 2 and 6
      var incCommenter = Math.floor(Math.random() * (7 - 2)) + 2;
      // console.log("incAuthor", incAuthor);
      // console.log("incCommenter", incCommenter);
      Meteor.call("Users.setRep", authorId, author.rep+incAuthor);
      Meteor.call("Users.setRep", user._id, user.rep+incCommenter);

      // send this noti to the author of original post
      // if I am not the OP
      Meteor.call("addNotification", {
        fromUserId: user._id,
        toUserId: authorId,
        postId: info.postId,
        body: "Someone commented on your toast!",
        icon: "ios-chatbubble",
        type: "comment"
      });
    });
  }
});
