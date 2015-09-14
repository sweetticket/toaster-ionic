Template.signUp.onRendered(function() {
  window.scrollTo(0, 0);
  Utils.tellAndroidLoadingEnded();
  Utils.initGA();
  ga('send', 'pageview');
});

var _toggleEnableSignUp = function() {
  var email = $.trim($('#new-email').val());
  var password = $.trim($('#new-password').val());
  var password2 = $.trim($('#new-password2').val());
};

Template.signUp.events({
  "click .signup-btn.enabled": function (e, template) {

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
        Utils.tellIOSILoggedIn(Utils.isUserVerified(Meteor.user()));

        if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
            alert('notVerified signed-in:'+ Meteor.userId());
        } else {
          Router.go('/');
        }
        
        ga('send', 'event', 'user', 'signup', {
          email: Meteor.user().emails[0].address
        });
      }
    });
  },

  "click .signin-link": function (e, template) {
    e.preventDefault();

    if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
      alert('toSignIn');
    }
    
    Router.go('/signIn');
  },

  "keyup .signup-container input": function (e, template) {
    e.preventDefault();

    var email = $('#email').val().toLowerCase().trim();
    var password = $('#password').val();
    var password2 = $('#password2').val();
    if (email.length > 0 && password.length > 0 && password2.length > 0) {
      $('.signup-btn').addClass('enabled');
    } else {
      $('.signup-btn.enabled').removeClass('enabled');
    }
  },
});
