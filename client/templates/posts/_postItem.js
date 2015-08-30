Template._postItem.helpers({
  isPlural: function () {
    return Comments.find({postId: this._id}).count() !== 1;
  },
});

Template._postItem.events({
  click: function (e, template) {
    console.log("I am clicked");
    var postId = template.data.post._id;
    window.location = "/posts/"+postId;
  }
});
