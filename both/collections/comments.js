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
    console.log("networkId", user.networkId);
    Comments.insert({
      postId: info.postId,
      body: info.body,
      userId: this.userId,
      networkId: user.networkId,
      createdAt: new Date()
    }, function () {
      console.log("comment is inserted");
      Meteor.call("addNotification", {
        // send this noti to the author of original post
        userId: authorId,
        postId: info.postId,
        body: "댓글: " + info.body
      });
    });
  }
});
