var _redirectToHome = function() {
  //FIXME: this is the last step. Redirect the user
  //to HOME screen, but it seems autorun reactivity is discontinued
  //work when the app is opened
  if (Session.get("isVerified")) {
    Session.set("isVerified", undefined);
    FlowRouter.go("/");
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

      Utils.tellAndroidIsVerified();

      FlowRouter.go("/");
    }
  });
});

Template.notVerified.onRendered(function() {
  Utils.tellIOSNotVerified();
  Utils.tellAndroidLoadingEnded();
});

Template.notVerified.events({
  "click .send-verification-again": function (e, template) {
    var email = Meteor.user().emails[0].address;
    Meteor.call("sendVerifyingEmail", Meteor.userId(), email)
  },

  "click .signin-link": function (e, template) {
    e.preventDefault();
    Meteor.logout();
    FlowRouter.go('signIn');
  },
});

Template.notVerified.helpers({
  email: function() {
    if (!Meteor.user()) {
      return "";
    }
    return Meteor.user().emails[0].address;
  }
});

Template.notVerified.onDestroyed(function() {
  document.removeEventListener("resume", _redirectToHome);
});
