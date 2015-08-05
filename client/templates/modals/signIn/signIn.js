Template.signIn.events({
  "click .signup-link": function (e, template) {
    e.preventDefault();
    IonModal.open("signUp");
    IonModal.close("signIn");
  },

  "click .signin-btn": function (e, template) {
    e.preventDefault();
    var email = $('#email').val().trim();
    var password = $('#password').val();
    Meteor.loginWithPassword(email, password, function (err) {
      if (err) {
        console.log("login failed");
        var user = Meteor.users.findOne({ "emails.address" : email });
        if (user) {
          // $('.show').removeClass('show');
          // $('.incorrect-pw').addClass('show');
        } else {
          // $('.show').removeClass('show');
          // $('.not-registered').addClass('show');
        }
        //fixme do something
      } else {
        IonModal.close();
      }
    });
  }
});
