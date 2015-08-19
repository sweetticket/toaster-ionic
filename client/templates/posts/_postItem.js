Template._postItem.helpers({
  isPlural: function () {
    return Comments.find({postId: this._id}).count() !== 1;
  },
});