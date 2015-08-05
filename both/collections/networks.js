// @cornell.edu is cornell.edu network
// @nyu.edu is nyu.edu network
// @snu.com is snu.com network
// We are going to blacklist the common email domains like
// gmail.com, hotmail.com, naver.com so users can not
// sign up with a generic email address

Networks = new Mongo.Collection("networks");

Meteor.methods({
  addNetwork: function (domain) {
    var network = {
      domain: domain,
      createdAt: new Date()
    }

    console.log("adding a network");

    return Networks.insert(network);
  }
});
