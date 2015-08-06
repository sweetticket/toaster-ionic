Template.newComment.onRendered(function(){
  // debugger
});

AutoForm.hooks({
  'comments-new-form': {
    onSuccess: function (operation, result, template) {
      console.log("gonna call addNotification");
      Meteor.call("addNotification", {
        userId: template.data.userId,
        postId: template.data.postId,
        body: "댓글이 달렸어요!"
      });
      IonModal.close();
    }
  }
});
