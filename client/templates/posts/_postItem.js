Template._postItem.helpers({
  isPlural: function () {
    return Comments.find({postId: this._id}).count() !== 1;
  },
});

Template._postItem.events({
  "click .post-list-item": function (event, template) {
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