Template.appLayout.onCreated(function() {
  console.log("created")
  // appLayoutSession = new ReactiveDict("appLayoutSession");

  this.autorun(function() {
    console.log("subscribing to notification")
    this.subscription = Meteor.subscribe("notifications");
  }.bind(this));
});

Template.appLayout.onRendered(function() {
  Session.set('currentTab', 'trending');
  
  //FIXME: maybe we don't need to show the loading status.
  // this.autorun(function () {
  //   if (!this.subscription.ready()) {
  //     IonLoading.show();
  //   } else {
  //     IonLoading.hide();
  //   }
  // }.bind(this));
});

Template.appLayout.events({
  'click [data-action=share-product]': function (event, template) {
    IonActionSheet.show({
      titleText: 'Share Post',
      buttons: [
        { text: '<i class="icon ion-social-twitter"></i> Tweet' },
        { text: '<i class="icon ion-ios-email"></i> Email' },
      ],
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        if (index === 0) {
          console.log('Tweet!');
        }
        if (index === 1) {
          console.log('Email!');
        }
        return true;
      }
    });
  }
});

Template.appLayout.helpers({
  "shouldHideTab": function (e, template) {
    return Session.get("shouldHideTabs");
  }
});
