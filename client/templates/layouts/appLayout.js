Template.appLayout.created = function () {
  appLayoutSession = new ReactiveDict("appLayoutSession");
}

Template.appLayout.rendered = function () {
  Session.set('currentTab', 'trending');
};

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
    return appLayoutSession.get("shouldHideTabs");
  }
});
