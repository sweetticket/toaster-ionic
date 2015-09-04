
Template._notificationItem.events({
  "click .notification-item": function (event, template) {
    // console.log("isNativeApp", Utils.isNativeApp);
    // console.log("getMobileOperatingSystem", Utils.getMobileOperatingSystem);
    if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
      // console.log("isNativeApp && android");
      event.preventDefault();
      var url = $(event.currentTarget).attr('href');
      alert(url);
    }
  }
});