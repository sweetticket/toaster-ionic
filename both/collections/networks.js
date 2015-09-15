// @cornell.edu is cornell.edu network
// @nyu.edu is nyu.edu network
// @snu.com is snu.com network
// We are going to blacklist the common email domains like
// gmail.com, hotmail.com, naver.com so users can not
// sign up with a generic email address

Networks = new Mongo.Collection("networks");

// see if domain is one of the blacklisted domains

var BLACKLISTED_EMAILS = [
  "gmail.com",
  "naver.com",
  "hotmail.com",
  "daum.net",
  "hanmail.net",
  "nate.com",
  "yahoo.com",
  "aol.com",
  "outlook.com",
  "sharklasers.com",
  "msn.com",
  "att.net",
  "live.com",
  "verizon.net"
]

Meteor.methods({
  addNetwork: function (domain) {
    if (_.contains(BLACKLISTED_EMAILS, domain)) {
      throw {
        reason: "BLACKLIST_DOMAIN",
        details: "You cannot use " + domain + ". Please use your organization email."
      };
    }

    var network = {
      domain: domain,
      createdAt: new Date()
    }

    console.log("NEW NETWORK:", domain);

    return Networks.insert(network);
  }
});
