
Template.settings.created = function() {
  this.autorun(function () {
    this.subscribe('userNetwork');
  }.bind(this));
};

Template.settings.events({
  'click [data-action=sign-out]': function (event, template) {
    Meteor.logout(function () {
      Router.go('/');
    });
  }
});

Template.settings.helpers({
  networkDomain: function() {
    var network = Networks.findOne();
    if (network) {
      return network.domain;  
    }
  },
});