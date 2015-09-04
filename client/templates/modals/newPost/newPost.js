Template.newPost.onRendered(function() {
  $('textarea').focus();
});

AutoForm.hooks({
  'products-new-form': {
    onSuccess: function (operation, result, template) {
      console.log("post on success");
      IonModal.close();
      IonKeyboard.close();
      Router.go('posts.show', {_id: result});
      Session.set("newPost", result);
      console.log("newPost id: " + Session.get("newPost"));

    }
  }
});

Template.newPost.events({
  // "focus .new-post-form textarea": function (e, template) {
  //   $('[data-keyboard-attach]').css({bottom: keyboardHeight});
  // },
  "keyup .new-post-form textarea": function (e, template) {
    var input = $('.new-post-form textarea').val();
    if (input.trim() !== "") {
      $('.submit-post-btn').addClass("show");
    } else {
      $('.submit-post-btn.show').removeClass("show");
    }

    $('.char-counter').text(140 - input.length);
  },

  "click .new-post-cancel-btn": function (e, template) {
    IonModal.close();
    var originalPath = window.location.pathname.split("#")[0];
    Router.go(originalPath);
  }

});