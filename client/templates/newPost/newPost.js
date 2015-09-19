Template.newPost.submitNewPost = function() {
  var body = $('#new-post-body').val().trim();
  if (body.length > 0) {
    Meteor.call("Posts.new", body, function (err, result) {
      if (err) {
        console.log(err);
        return false;
      }

      ga('send', 'event', 'post', 'submit', {
        network: Networks.findOne().domain,
        msg: body
      });

      FlowRouter.go('/');
      Utils.tellIOSToOpenTab("recent");

      // Session.set("newPost", result);
    });
  }
};

Template.newPost.onCreated(function() {
  this.autorun(function () {
    this.subscribe('userNetwork');
  }.bind(this));

  if (Utils.getMobileOperatingSystem() === 'iOS') {
    window.location = "toasterapp://newPost";
  }
});

Template.newPost.onRendered(function() {
  $('textarea').focus();

  Utils.initGA();
  Utils.tellAndroidLoadingEnded();
});

Template.newPost.events({
  "keyup .new-post-form textarea": function (e, template) {
    var input = $('.new-post-form textarea').val();
    if (input.trim() !== "") {
      $('.submit-post-btn').addClass("show");
    } else {
      $('.submit-post-btn.show').removeClass("show");
    }

    $('.char-counter').text(140 - input.length);
  },

  "click .new-post-cancel-btn": function (e, template) {
    IonModal.close();
    var originalPath = window.location.pathname.split("#")[0];
    FlowRouter.go(originalPath);
  }

});