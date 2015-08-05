// Meteor.users.before.insert(function (userId, doc) {
//   doc.profile.votedProductIds = [];
// });

// Meteor.users.helpers({
//   votedProducts: function () {
//     return Products.find({_id: {$in: this.profile.votedProductIds}});
//   }
// });


Meteor.startup(function() {

  if (Meteor.isServer) {
    Accounts.emailTemplates.from = 'Toaster <toastersignup@gmail.com>';
    Accounts.emailTemplates.siteName = 'Toaster';

    // A Function that takes a user object and returns a String for the subject line of the email.
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
      return 'Confirm Your Email Address';
    };

    // Accounts.urls.verifyEmail = function (token){
    //   return Meteor.absoluteUrl("verify-email/" + token);
    // };

    // Accounts.emailTemplates.configureRoute(null, '/verify');

    // A Function that takes a user object and a url, and returns the body text for the email.
    // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
    Accounts.emailTemplates.verifyEmail.text = function (user, url) {
      // var newUrl = url
      // FIXME: I want him to go to /verify

      return 'click on the following link to verify your email address: ' + url;
    };

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
        // FIXME: what if err?
        try {
          var networkId = Meteor.call("addNetwork", domain);
          user.networkId = networkId;
        } catch (err) {
          console.log("failed to join network", err);  
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
