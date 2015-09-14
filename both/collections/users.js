// user is redirect to home after he's verified his email
handleOpenURL = function (url) {
  console.log("handleOpenURL called!!");
  setTimeout(function() {
    console.log("received url:", url);
    if (url.indexOf("toaster://verified") >= 0) {
      console.log("verified. Now redirecting!!");
      Router.go('/');
    }
  }, 0)
}

//this function gets called when the user
//clicks the verification link
if (Meteor.isClient) {
  Accounts.onEmailVerificationLink(function (token, done) {
    Accounts.verifyEmail(token, function (err) {
      if (err) {
        console.log("account verification failed");
        return;
      }

      //FIXME: maybe open a Welcome modal?
      _.defer(function() {
        done();
      });

      Utils.initGA();
      ga('send', 'event', 'user', 'verifiedEmail', {
        email: Meteor.user().emails[0].address
      });

      Utils.openApp();
    });
  });
}

if (Meteor.isServer) {
  Meteor.methods({ 
    "sendVerifyingEmail": function (userId, email) {
      Accounts.sendVerificationEmail(userId, email);
      console.log("email sent");
    }
  });
}

Meteor.methods({
  "Users.setRep": function (userId, newRep) {
    Meteor.users.update({ _id: userId}, {
      "$set": { rep: newRep }
    });
  }

});

Meteor.startup(function() {
  if (Meteor.isServer) {

    Accounts.emailTemplates.from = 'Toaster <toastersignup@gmail.com>';
    Accounts.emailTemplates.siteName = 'Toaster';

    // A Function that takes a user object and returns a String for the subject line of the email.
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
      return 'Welcome to Toaster!';
    };

    Accounts.emailTemplates.verifyEmail.html = function (user, url) {
      var template = "<p style=\"font-weight:bold;\">WELCOME TO TOASTER!</p>" +
        "<p> Please click the link: " + url + " to start using Toaster right away." +
        "You can now freely share the thoughts you've always been keeping to yourself." +
        "Your identity is kept secret; you'll know your audience, but your audience will not know you."
        "We only used your email for verifying your account and it will never be published.</p>" +
        "<p>Happy toasting!</p>" +
        "<br><br><p>Honeyjam Studio Team</p>";
      return template;
    }

    Accounts.onCreateUser(function (options, user) {
      var userId = user._id;
      var email = options.email;
      var domain = Utils.getDomain(email);
      var network = Networks.findOne({
        domain: domain
      });

      user.color = Utils.getRandomColor();
      user.icon = Utils.getRandomIcon();
      user.rep = 0;

      if (network) {
        user.networkId = network._id;
      } else {
        try {
          var networkId = Meteor.call("addNetwork", domain);
          user.networkId = networkId;
        } catch (err) {
          throw new Meteor.Error(500, err.reason, err.details);
        }
      }

      // we wait for Meteor to create the user before sending an email
      Meteor.setTimeout(function() {
        Accounts.sendVerificationEmail(userId, email);
      }, 2 * 1000);
      
      return user;
    });
  }
});
