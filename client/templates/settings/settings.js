
Template.settings.created = function() {
  this.autorun(function () {
    this.subscribe('userNetwork');
  }.bind(this));
};

Template.settings.rendered = function() {
  Utils.tellAndroidLoadingEnded();
};

Template.settings.events({
  'click [data-action=sign-out]': function (event, template) {
    Meteor.logout(function () {
      Session.set("currentUserId", undefined);

      Utils.tellIOSILoggedOut();

      if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
        event.preventDefault();
        alert('logout');
      } else {
        Router.go('/');
      }
    });
  },
  'click .settings-about': function (event, template) {
    event.preventDefault();
    if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
        event.preventDefault();
        alert('about');
    } else if (Utils.getMobileOperatingSystem() === 'iOS') {
      Utils.tellIOSScheme("about");
      // Router.go('about');
    } else {
      Router.go('about');
    }
  },
  'click .settings-privacy': function (event, template) {
    event.preventDefault();
    if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
        event.preventDefault();
        alert('privacy');
    } else if (Utils.getMobileOperatingSystem() === 'iOS') {
      Utils.tellIOSScheme("privacypolicy");
    } else {
      Router.go('privacy');
    }
  },
  'click .settings-terms': function (event, template) {
    event.preventDefault();
    if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
      // console.log("isNativeApp && android");
        event.preventDefault();
        alert('terms');
    } else if (Utils.getMobileOperatingSystem() === 'iOS') {
      Utils.tellIOSScheme("termsofservice");
    } else {
      Router.go('terms');
    }
  },
  // 'click .settings-share': function (event, template) {
  //   if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
  //     // console.log("isNativeApp && android");
  //       event.preventDefault();
  //   }
  // }
});

Template.settings.helpers({
  "networkDomain": function() {
    var network = Networks.findOne();
    if (network) {
      return network.domain;  
    }
  },

});