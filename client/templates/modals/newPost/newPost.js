AutoForm.hooks({
  'products-new-form': {
    onSuccess: function (operation, result, template) {
      console.log("post on success");
      IonModal.close();
      IonKeyboard.close();
      Router.go('posts.show', {_id: result});
    }
  }
});
