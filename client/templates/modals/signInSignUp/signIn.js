Template.signIn.rendered = function() {
  Utils.tellAndroidLoadingEnded();
  window.scrollTo(0, 0);
};

Template.signIn.events({
  "click .signup-link": function (e, template) {
    e.preventDefault();

    if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
      alert('toSignUp');
    }
    
    Router.go('/signUp');
  },

  "click .signin-btn.enabled": function (e, template) {
    var email = $('#email').val().trim();
    var password = $('#password').val();
    Meteor.loginWithPassword(email, password, function (err) {
      if (err) {
        console.log(err);

        var user = Meteor.users.findOne({ "emails.address" : email });
        if (err.reason === "Incorrect password") {
          $('.show').removeClass('show');
          $('.incorrect-pw').addClass('show');
        } else if (err.reason === "User not found") {
          $('.show').removeClass('show');
          $('.not-registered').addClass('show');
        }
      } else {

        Session.set("currentUserId", Meteor.userId());
        Session.set("firstOpened", true);
        $('.tabs a.active').removeClass('active');
        $('.tabs a:first-child').addClass('active');
        Utils.tellIOSILoggedIn();
        
        if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
          alert('signed-in:'+ Meteor.userId());
        } else {
          Router.go('/');
        }
      }
    });
  },

  "keyup .signup-container input": function (e, template) {
    var email = $('#email').val().toLowerCase().trim();
    var password = $('#password').val();
    if (email.length > 0 && password.length > 0) {
      $('.signin-btn').addClass('enabled');
    } else {
      $('.signin-btn.enabled').removeClass('enabled');
    }
  },
});
