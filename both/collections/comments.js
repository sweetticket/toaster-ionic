Comments = new Mongo.Collection('comments');

Comments.helpers({
  author: function () {
    return Meteor.users.findOne({_id: this.userId});
  },
  fromNow: function () {
    return moment(this.createdAt).fromNow();
  },
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
