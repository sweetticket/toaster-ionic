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


    //FIXME: THIS IS ONLY CALLED ONCE T-T
    this.autorun(function() {
      debugger
      var ready = Session.get("ready");
      var network = Networks.findOne();
      var currentUserId = Session.get("currentUserId");
        if (Meteor.user() && network && ready){
          $('.resume-network').addClass('show');
          $('.resume-domain').text('@' + network.domain);
            setTimeout(function () {
              $('.resume-network').fadeOut("slow", function() {
                  $(this).removeClass("show");
              });
            }, 2000);
          }
        });

});

Template.appLayout.events({
  'click [data-action=share-post]': function (event, template) {
    IonActionSheet.show({
      titleText: 'Share Post',
      buttons: [
        { text: '<i class="icon ion-social-facebook"></i> Post' },
        { text: '<i class="icon ion-social-twitter"></i> Tweet' },
        { text: '<i class="icon ion-social-pinterest"></i> Pin' },
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
          //TODO
          console.log('Pin!');
        }
        if (index === 3) {
          //TODO
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
        { text: '<i class="icon ion-social-pinterest"></i> Pin' },
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
          //TODO
          console.log('Pin!');
        }
        if (index === 3) {
          //TODO
          console.log('Email!');
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
  }
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

