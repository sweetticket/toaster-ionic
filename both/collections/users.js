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

      Utils.openIOSApp();
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
      var template = "<h5>토스터에 오신걸 환영합니다</h5>" +
        "<p> " + url + " 을 클릭하시면 토스터를 바로 이용하실 수 있습니다." +
        "평소에 마음에 두고만 있었던 얘기들을 이제 솔직하게 말할 수 있습니다." +
        "인증에 사용된 이메일은 본인 이외에는 아무도 보지 못하니 걱정 마세요." +
        "그리고 익명성은 투명한 의사소통을 위한 것이고 상호간의 존중은 꼭 지켜주세요!" +
        "필요하신 기능, 하시고 싶으신 말 언제든지 이 메일로 답장해 주시면 됩니다." +
        "감사합니다!</p>" +
        "<br><br><p>허니잼 스튜디오 드림</p>";
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
