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
  "nate.com"
]

var _checkDomain = function (domain) {

}

Meteor.methods({
  addNetwork: function (domain) {
    if (_.contains(BLACKLISTED_EMAILS, domain)) {
      throw {
        reason: "BLACKLIST_DOMAIN",
        details: domain + "은 사용하실 수 없어요!"
      };
    }

    var network = {
      domain: domain,
      createdAt: new Date()
    }

    console.log("adding a network");

    return Networks.insert(network);
  }
});
