
var _toggleEnableSignUp = function() {
  var email = $.trim($('#new-email').val());
  var password = $.trim($('#new-password').val());
  var password2 = $.trim($('#new-password2').val());

  // if (email !== "" && password !== "" && password2 !== "") {
  //   $('.signup-btn').removeClass('disabled');
  // } else {
  //   $('.signup-btn').addClass('disabled');
  // }
};

Template.signUp.events({
  "keyup input": function (e, template) {
    // _toggleEnableSignUp();
  },

  "click .signup-btn": function (e, template) {
    var email = $('#email').val();
    var password = $('#password').val();
    var password2 = $('#password2').val();

    if (!Utils.validateEmail(email)) {
      console.log("email invalid");
      $('.show').removeClass('show');
      $('.invalid-email').addClass('show');
      return false;

    } else if (password !== password2) {
      $('.show').removeClass('show');
      $('.pw-mismatch').addClass('show');
      console.log("passwords mismatch");
      return false;
    }

    Accounts.createUser({
      email: email,
      password: password
    }, function (err) {

      console.log("SIGNUP: ACCOUNT CREATED");

      if (err) {
        console.log("createUser failed", err);

        if (err.reason === "Email already exists.") {
          $('.show').removeClass('show');
          $('.already-registered').addClass('show');
        } else if (err.reason === "BLACKLIST_DOMAIN") {
          $('.show').removeClass('show');
          $('.blacklist-domain-err').text(err.details);
          $('.blacklist-domain-err').addClass('show');
        }
        return false;
      } else {
        // FIXME: CHANGE LATER TO 'NOT VERIFIED'
        // Session.set('currentTab', 'recent');
        $('.tabs a.active').removeClass('active');
        $('.tabs a:first-child').addClass('active');
        Router.go('/');
      }
    });
  },

  "click .signin-link": function (e, template) {
    e.preventDefault();
    Router.go('/signIn');
  },

  "keyup .signup-container input": function (e, template) {
    var email = $('#email').val().trim();
    var password = $('#password').val();
    var password2 = $('#password2').val();
    if (email.length > 0 && password.length > 0 && password2.length > 0) {
      $('.signup-btn').addClass('enabled');
    } else {
      $('.signup-btn.enabled').removeClass('enabled');
    }
  },
});
