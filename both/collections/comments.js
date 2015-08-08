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

      // send this noti to the author of original post
      // if I am not the OP
      Meteor.call("addNotification", {
        fromUserId: user._id,
        toUserId: authorId,
        postId: info.postId,
        //CHANGED THIS FOR NOW
        // body: "댓글이 달렸어요: \"" + info.body + "\"",
        body: "이 토스트가 댓글이 달렸어요",
        icon: "ios-chatbubble"
      });
    });
  }
});
