var _onScroll = function() {
    var distanceY = $('.content').pageYOffset || $('.content').scrollTop();
    // console.log("distanceY", distanceY);
    // console.log("pageYOffset", $('.content').pageYOffset);
    // console.log("")
    var $header = $('.bar.bar-stable');

    if (distanceY > Utils.HEADER_CHANGE_THRESHOLD) {
      // $('.bar.bar-stable').velocity({top: '-100%'});
      if (!$header.hasClass("collapsed")) {
        $header.addClass("collapsed");  
      }
    } else {
      if ($header.hasClass("collapsed")) {
        $header.removeClass("collapsed");
      }
    }
  }

Template.appLayout.onCreated(function() {
  // appLayoutSession = new ReactiveDict("appLayoutSession");

  this.autorun(function() {
    this.subscribe("notifications");
    this.subscribe("userNetwork");
  }.bind(this));
});

Template.appLayout.onRendered(function() {
  Session.set("firstOpened", true);
  FastClick.attach(document.body);

  Utils.initGA();
  ga('send', 'pageview');
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
  'click .delete-post': function (event, template) {
    event.preventDefault();
    // debugger
    Meteor.call("Posts.delete", this._id, function(err) {
      if (err){
        console.log(err);
        return;
      }

      //Should have feedback modal ("Your post has been deleted")
      // Router.go('/');
      $('[data-nav-container]').addClass('nav-view-direction-back');
      $('[data-navbar-container]').addClass('nav-bar-direction-back');
      // backUrl = template.getBackUrl()
      // if (backUrl) {
      //   Router.go(backUrl);
      // } else {
      //   window.history.back();
      // }
      history.back();

      var popup = "<div class='popup delete-success'>"
                      + "<p>Your post has been deleted!</p>"
                      + "</div>";

      $('body').append(popup);

      setTimeout(function () {
        $('.delete-success').fadeOut("slow", function() {
            $(this).remove();
        });
      }, 2000);

    });
  },

  'click [data-action=share-app]': function (event, template) {
    IonActionSheet.show({
      titleText: 'Share Toaster',
      buttons: [
        { text: '<i class="icon ion-social-facebook"></i> Post' },
        { text: '<i class="icon ion-social-twitter"></i> Tweet' },
        // { text: '<i class="icon ion-ios-email"></i> Email' },
      ],
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        if (index === 0) {
          var url = "https://www.facebook.com/dialog/share?" +
            "app_id=com.honeyjam.toaster" +
            "&display=popup" +
            "&href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F" +
            "&redirect_uri=gettoaster.com/download";
          if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
            alert("share:" + url);
          } else {
            window.open(url, '_system');
          }
        }
        if (index === 1) {sh
          var url = "http://twitter.com/home?status=Join+Toaster!+gettoaster.com/download";
          if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
            alert("share:" + url);
          } else {
            window.open(url, '_system');
          }
        }
        // if (index === 2) {
        //   var url = "mailto:?subject=Join Toaster!&amp;body=Join Toaster! Go to toasterapp.meteor.com/getToaster and download the app!"
        //   if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
        //     alert("share:" + url);
        //   } else {
        //     window.open(url, '_system');
        //   }
        // }
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

  // 'click .submit-new-post-btn': function (event, template) {
  //   document.title += "New Post";
  // }
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

