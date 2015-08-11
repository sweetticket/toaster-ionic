Template.newPost.onRendered(function() {
});

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

Template.newPost.events({
  "keyup .new-post-form textarea": function (e, template) {
    var input = $('.new-post-form textarea').val();
    if (input.trim() !== "") {
      $('.submit-post-btn').addClass("show");
    } else {
      $('.submit-post-btn.show').removeClass("show");
    }

    $('.char-counter').text(140 - input.length);
  },

});