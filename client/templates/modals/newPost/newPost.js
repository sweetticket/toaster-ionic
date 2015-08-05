AutoForm.hooks({
  'products-new-form': {
    onSuccess: function (operation, result, template) {
      IonModal.close();
      IonKeyboard.close();
      Router.go('posts.show', {_id: result});
    }
  }
});
