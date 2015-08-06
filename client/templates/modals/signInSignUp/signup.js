Template.signUp.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('userEmails');
  }.bind(this));
};


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

  "click .signup-btn.enabled": function (e, template) {
    var email = $('#email').val();
    var password = $('#password').val();
    var password2 = $('#password2').val();

    console.log("password", password2);

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

    console.log("am I reached?");

    Accounts.createUser({
      email: email,
      password: password
    }, function (err) {

      if (err) {
        console.log("createUser failed", err);

        var user = Meteor.users.findOne({ "emails.address" : email });
        if (user) {
          $('.show').removeClass('show');
          $('.already-registered').addClass('show');
        }
        return false;
      } else {
        IonModal.close();
      }
    });
  },

  "click .signin-link": function (e, template) {
    e.preventDefault();
    IonModal.close("signUp");
    IonModal.open("signIn");
  },

  "keyup .signup-modal input": function (e, template) {
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
