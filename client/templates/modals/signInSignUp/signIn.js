Template.signIn.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('userEmails');
  }.bind(this));
};


Template.signIn.events({
  "click .signup-link": function (e, template) {
    e.preventDefault();
    IonModal.close("signIn");
    IonModal.open("signUp");
  },

  "click .signin-btn.enabled": function (e, template) {
    console.log("signin butn clicked");

    // e.preventDefault();
    var email = $('#email').val().trim();
    var password = $('#password').val();
    Meteor.loginWithPassword(email, password, function (err) {
      if (err) {
        console.log("login failed");
        var user = Meteor.users.findOne({ "emails.address" : email });
        if (user) {
          $('.show').removeClass('show');
          $('.incorrect-pw').addClass('show');
        } else {
          $('.show').removeClass('show');
          $('.not-registered').addClass('show');
        }
        //fixme do something
      } else {
        IonModal.close();
      }
    });
  },

  "keyup .signup-modal input": function (e, template) {
    var email = $('#email').val().trim();
    var password = $('#password').val();
    if (email.length > 0 && password.length > 0) {
      $('.signin-btn').addClass('enabled');
    } else {
      $('.signin-btn.enabled').removeClass('enabled');
    }
  },

});
