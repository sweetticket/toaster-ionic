var _redirectToHome = function() {
  console.log("device ready works!!!");
  //FIXME: this is the last step. Redirect the user
  //to HOME screen, but it seems autorun reactivity is discontinued
  //work when the app is opened
  if (Session.get("isVerified")) {
    Session.set("isVerified", undefined);
    console.log("Go to recent");
    $('.tabs a.active').removeClass('active');
    $('.tabs a:first-child').addClass('active');
    Router.go("/");
  }
}

Template.notVerified.onCreated(function() {
  // Mobile: FIXME!! please redirect..
  // redirect to "recent" page when this app is opened
  // after email verification

  document.addEventListener("resume", _redirectToHome);

  this.autorun(function() {
    if (Session.get("isVerified")) {
      console.log("verified so good");
      $('.tabs a.active').removeClass('active');
      $('.tabs a:first-child').addClass('active');
      Router.go("/");
    }
  });
});

Template.notVerified.events({
  "click .send-verification.again": function (e, template) {
    var email = Meteor.user().emails[0].address;
    Meteor.call("sendVerifyingEmail", Meteor.userId(), email)
    Accounts.sendVerificationEmail(userId, email);
  },
  "click .signin-link": function (e, template) {
    
    //FIXME: WHY DOES IT TRANSITION SO WEIRDLY
    e.preventDefault();
    Router.go('/signIn');
  },
});

Template.notVerified.onDestroyed(function() {
  document.removeEventListener("resume", _redirectToHome);
});
