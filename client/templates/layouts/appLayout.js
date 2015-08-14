Template.appLayout.onCreated(function() {
  // appLayoutSession = new ReactiveDict("appLayoutSession");

  this.autorun(function() {
    this.subscribe("notifications");
    this.subscribe("userNetwork");
  }.bind(this));
});

Template.appLayout.onRendered(function() {
  if (Router.current().route.getName() === 'recent') {
    $('.tabs a:first-child').addClass('active');
  }

  Session.set("firstOpened", true);

  FastClick.attach(document.body);

  // this.autorun(function() {
  //   var ready = Session.get("ready");
  //   // var currentUserId = Session.get("currentUserId");
  //   var network = Networks.findOne();
  //   if (Meteor.user() && ready && network){
  //     $('.resume-network').addClass('show');
  //       setTimeout(function () {
  //         $('.resume-network').fadeOut("slow", function() {
  //             $(this).removeClass("show");
  //         });
  //       }, 2000);
  //     }
  // });

    this.autorun(function() {
      var ready = Session.get("ready");
      var network = Networks.findOne();
      var currentUserId = Session.get("currentUserId");
      var firstOpened = Session.get("firstOpened");
        if (Meteor.user() && network && ready && firstOpened){
          if ($('.resume-network').length === 0){

            var popup = "<div class='resume-network'>"
                      + "<p>You are signed into</p>"
                      + "<p class='resume-domain'>@" + network.domain +"</p>"
                      + "</div>";

            $('body').append(popup);

              setTimeout(function () {
                $('.resume-network').fadeOut("slow", function() {
                    Session.set("firstOpened", false);
                    $(this).remove();
                });
              }, 2000);
            }
          }
        });

});

Template.appLayout.events({
  'click .bar.bar-header': function (event, template) {
    
    event.stopPropagation();
    $('.content').animate({ scrollTop: 0 }, 300);
  },

  'click [data-action=share-post]': function (event, template) {
    IonActionSheet.show({
      titleText: 'Share Post',
      buttons: [
        { text: '<i class="icon ion-social-facebook"></i> Post' },
        { text: '<i class="icon ion-social-twitter"></i> Tweet' },
        // { text: '<i class="icon ion-social-pinterest"></i> Pin' },
        { text: '<i class="icon ion-ios-email"></i> Email' },
      ],
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        if (index === 0) {
          //TODO
          console.log('Post!');
        }
        if (index === 1) {
          //TODO
          console.log('Tweet!');
        }
        if (index === 2) {
          
          console.log('Email!');
        }
        return true;
      }
    });
  },

  'click [data-action=share-app]': function (event, template) {
    IonActionSheet.show({
      titleText: 'Share Toaster',
      buttons: [
        { text: '<i class="icon ion-social-facebook"></i> Post' },
        { text: '<i class="icon ion-social-twitter"></i> Tweet' },
        { text: '<i class="icon ion-ios-email"></i> Email' },
      ],
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        if (index === 0) {
          //CHANGE THIS URL LATER
          var url = "http://www.facebook.com/sharer/sharer.php?u=toasterapp.meteor.com/getToaster&title=Toaster";
          window.open(url, '_system');
        }
        if (index === 1) {
          //CHANGE THIS URL LATER
          var url = "http://twitter.com/home?status=Join+Toaster!+toasterapp.meteor.com/getToaster";
          window.open(url, '_system');
        }
        if (index === 2) {
          var url = "mailto:?subject=Join Toaster!&amp;body=Join Toaster! Go to toasterapp.meteor.com/getToaster and download the app!"
          window.open(url, '_system');
        }
        return true;
      }
    });
  },

  'click .tabs a': function (event, template) {
    var isActive = ($(event.target).is('a') && $(event.target).hasClass('active'))
                    || ($(event.target).is('i') && $(event.target).parent().hasClass('active'));
    if (!isActive) {
      $('.tabs a.active').removeClass('active'); 
    }
  },
});

Template.appLayout.helpers({
  "shouldHideTab": function (e, template) {
    var shouldHideTabs = Session.get("shouldHideTabs") || !Meteor.user();
    return shouldHideTabs;
  },
  "newExist": function (e, template) {
    if (Notifications.findOne({isRead: false})) {
      return "show";
    }
    return "";
  },
  // "resumedUser": function(e, template) {

  // },
  "networkDomain": function(e, template) {
    var network = Networks.findOne();
    if (network) {
      return network.domain;  
    }
  },
});

