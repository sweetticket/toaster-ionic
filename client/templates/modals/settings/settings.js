Template.settings.events({
  'click [data-action=sign-out]': function (event, template) {
    Meteor.logout(function () {
      IonModal.close();
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
