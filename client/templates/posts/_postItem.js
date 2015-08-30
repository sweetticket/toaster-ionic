Template._postItem.helpers({
  isPlural: function () {
    return Comments.find({postId: this._id}).count() !== 1;
  },
});

Template._postItem.events({
  click: function (e, template) {
    console.log("I am clicked");
    var postId = template.data.post._id;

    // HOWON: invoke xcode function

    // window.location = "app://"+"posts/postId";

    Router.go("/posts/"+postId)
  }
});
