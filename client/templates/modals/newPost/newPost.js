Template.newPost.onRendered(function() {
  // this.find('textarea').focus();
  // if (Meteor.isCordova) {
  //   //for android
  //   cordova.plugins.Keyboard.show();
  // }

  // Meteor.setTimeout( function () {
  //   $( '.new-post-form textarea' ).focus()
  // }, 2000 );

  // setTimeout( function () {
  //   console.log("focued!");
  //   $( '.new-post-form textarea' ).focus()
  // }, 2000 );

  Meteor.setTimeout(function () {                                                                                    // 77
    $(template.find("textarea")).focus();                                                                                   // 78
  }.bind(this), 1000);

  // this.autorun(function () {
  //   var $input = $(template.find("textarea"))
  //   if ($input) {
  //     $input.focus();
  //   }
  // }.bind(this));

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