
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
      // Session.set("ready", false);
      Session.set("currentUserId", undefined);
      // window.scrollTo(0, 0);

      Utils.tellIOSILoggedOut();

      if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
      // console.log("isNativeApp && android");
        event.preventDefault();
        alert('logout');
      } else {
        Router.go('/');
      }
    });
  },
  'click .settings-about': function (event, template) {
    if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
      // console.log("isNativeApp && android");
        event.preventDefault();
        alert('about');
    } else {
      Router.go('/settings/about');
    }
  },
  // 'click .settings-privacy': function (event, template) {
  //   if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
  //     // console.log("isNativeApp && android");
  //       event.preventDefault();
  //       alert('privacy');
  //   } else {
  //     Router.go('/settings/privacy');
  //   }
  // },
  'click .settings-terms': function (event, template) {
    if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
      // console.log("isNativeApp && android");
        event.preventDefault();
        alert('terms');
    } else {
      Router.go('/settings/terms');
    }
  },
  'click .settings-share': function (event, template) {
    if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
      // console.log("isNativeApp && android");
        event.preventDefault();
        alert('share');
    }
  }
});

Template.settings.helpers({
  "networkDomain": function() {
    var network = Networks.findOne();
    if (network) {
      return network.domain;  
    }
  },

});