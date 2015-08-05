Posts = new Mongo.Collection('posts');

Posts.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

Posts.helpers({
  datePosted: function() {
    return moment(this.createdAt).format('M/D');
  },
  fromNow: function() {
    return moment(this.createdAt).fromNow();
  },
  author: function() {
    return Meteor.users.findOne({_id: this.userId});
  },
  upvotes: function() {
    return Meteor.users.find({_id: {$in: this.upvoterIds}}).count();
  },
  downvotes: function() {
    return Meteor.users.find({_id: {$in: this.downvoterIds}}).count();
  },
  numberOfComments: function() {
    return Comments.find({postId: this._id}).count();
  }
});

// RegExp.escape = function(s) {
//   return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
// };

// posts.search = function(query) {
//   if (!query) {
//     return;
//   }
//   return posts.find({
//     name: { $regex: RegExp.escape(query), $options: 'i' }
//   }, {
//     limit: 20
//   });
// };

Posts.attachSchema(new SimpleSchema({
  // url: {
  //   type: String,
  //   autoform: {
  //     'label-type': 'placeholder',
  //     placeholder: 'Product URL'
  //   },
  //   max: 200
  // },
  // name: {
  //   type: String,
  //   autoform: {
  //     'label-type': 'placeholder',
  //     placeholder: 'Product Name'
  //   },
  //   max: 200
  // },
  body: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '같은 네트워크에 있는 사람들과 익명으로 대화할 수 있어요'
    },
    max: 200
  },
  userId: {
    type: String,
    autoValue: function () {
      if (this.isSet) {
        return;
      }
      if (this.isInsert) {
        return Meteor.userId();
      } else {
        this.unset();
      }
    }
  },
  upvoterIds: {
    type: [String],
    optional: true,
    defaultValue: []
  },
  downvoterIds: {
    type: [String],
    optional: true,
    defaultValue: []
  },
  numLikes: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  // numberOfComments: {
  //   type: Number,
  //   optional: true,
  //   defaultValue: 0
  // },
  createdAt: {
    type: Date
  }
}));
