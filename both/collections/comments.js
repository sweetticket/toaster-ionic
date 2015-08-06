Comments = new Mongo.Collection('comments');

Comments.helpers({
  author: function () {
    return Meteor.users.findOne({_id: this.userId});
  },
});

Meteor.methods({
  "Comments.new": function (info) {
    var authorId = info.authorId;
    Comments.insert({
      postId: info.postId,
      body: info.body,
      userId: this.userId,
      networkId: this.user().networkId,
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

Comments.attachSchema(new SimpleSchema({
  body: {
    type: String,
    autoform: {
      rows: 6,
      'label-type': 'placeholder',
      placeholder: '댓글을 작성하세요'
    }
  },
  userId: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      } else {
        this.unset();
      }
    }
  },
  postId: {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else {
        this.unset();
      }
    }
  }
}));
