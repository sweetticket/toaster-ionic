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
      console.log("now you are verified!");
      _.defer(function() {
        done();
      });

      // If the user is on a phone, open the app
      console.log("setting is verified true");
      Session.set("isVerified", true);
      window.location = "toaster://";
    });
  });
}

Meteor.methods({
  "sendVerifyingEmail": function (userId, email) {
    Accounts.sendVerificationEmail(userId, email);
    console.log("email sent");
  }
});

Meteor.startup(function() {
  if (Meteor.isServer) {

    Accounts.emailTemplates.from = 'Toaster <toastersignup@gmail.com>';
    Accounts.emailTemplates.siteName = 'Toaster';

    // A Function that takes a user object and returns a String for the subject line of the email.
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
      return 'Confirm Your Email Address';
    };

    // A Function that takes a user object and a url, and returns the body text for the email.
    // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
    Accounts.emailTemplates.verifyEmail.text = function (user, url) {
      // var newUrl = url
      // FIXME: I want him to go to /verify
      console.log(url);
      return '이메일 인증: ' + url;
    };

    // Accounts.emailTemplates.verifyEmail.html = function (user, url) {

    // }

    Accounts.onCreateUser(function (options, user) {
      var userId = user._id;
      var email = options.email;
      var domain = Utils.getDomain(email);
      var network = Networks.findOne({
        domain: domain
      });

      user.color = Utils.getRandomColor();
      user.icon = Utils.getRandomIcon();

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
