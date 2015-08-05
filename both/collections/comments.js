Comments = new Mongo.Collection('comments');

Comments.helpers({
  author: function () {
    return Meteor.users.findOne({_id: this.userId});
  },
  fromNow: function () {
    return moment(this.createdAt).fromNow();
  },
});

Meteor.methods({
  "Comments.new": function (comment) {
    Comments.insert(_.extend(comment, {
      userId: this.userId,
      createdAt: new Date()
    }), function() {
      console.log("comment is inserted");
      Meteor.call("addNotification", {
        userId: comment.userId,
        postId: comment.postId
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
