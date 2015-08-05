var _toggleEnableSignUp = function() {
  var email = $.trim($('#new-email').val());
  var password = $.trim($('#new-password').val());
  var password2 = $.trim($('#new-password2').val());

  if (email !== "" && password !== "" && password2 !== "") {
    $('.signup-btn').removeClass('disabled');
  } else {
    $('.signup-btn').addClass('disabled');
  }
};

Template.signUp.events({
  "keyup input": function (e, template) {
    _toggleEnableSignUp();
  },

  "click .signup-btn": function (e, template) {
    e.preventDefault();
    var email = $('#new-email').val();
    var password = $('#new-password').val();
    var password2 = $('#new-password2').val();

    // if (!Utils.validateEmail(email)) {
    //   console.log("email invalid");
    //   $('.show').removeClass('show');
    //   $('.invalid-email').addClass('show');
    //   return false;

    // } else if (password !== password2) {
    //   $('.show').removeClass('show');
    //   $('.pw-mismatch').addClass('show');
    //   console.log("passwords mismatch");
    //   return false;
    // }

    Accounts.createUser({
      email: email,
      password: password
    }, function (err) {
      if (err) {
        console.log("createUser failed", err);

        // var user = Meteor.users.findOne({ "emails.address" : email });
        // if (user) {
        //   $('.show').removeClass('show');
        //   $('.already-registered').addClass('show');
        // }

        return false;
      }
      console.log("signup success", email);
      IonModal.close();
    });
  },

  "click .signin-link": function (e, template) {
    e.preventDefault();
    IonModal.open("signIn");
  },
});
