Template.signIn.rendered = function() {
  Utils.tellAndroidLoadingEnded();
  window.scrollTo(0, 0);

};

Template.signIn.events({
  "click .signup-link": function (e, template) {
    e.preventDefault();
    
    if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
      alert('toSignUp');
      return;
    }

    Router.go('signUp');
  },

  "click .signin-btn.enabled": function (e, template) {
    
    $('input').blur();

    var email = $('#email').val().trim();
    var password = $('#password').val();
    console.log("login with password");
    console.log("connected:", Meteor.status().connected);
    console.log("status:", Meteor.status().status);
    console.log("reason:", Meteor.status().reason);
    Meteor.reconnect();
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
        //fixme do something
      } else {
        Session.set("currentUserId", Meteor.userId());

        // for Android
        // if (Utils.isNativeApp && Utils.getMobileOperatingSystem === 'Android') {
        //   alert(Meteor.userId());
        // }

        Session.set("firstOpened", true);
        $('.tabs a.active').removeClass('active');
        $('.tabs a:first-child').addClass('active');

        if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
            alert('signed-in');
        } else {
          Router.go('/');
        }
      }
    });
  },

  "keyup .signup-container input": function (e, template) {
    var email = $('#email').val().trim();
    var password = $('#password').val();
    if (email.length > 0 && password.length > 0) {
      $('.signin-btn').addClass('enabled');
    } else {
      $('.signin-btn.enabled').removeClass('enabled');
    }
  },

});
