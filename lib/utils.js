Meteor.startup(function() {
  Utils = {};

  Utils.HEADER_CHANGE_THRESHOLD = 150;
  Utils.NUM_POSTS_TO_FETCH = 5;
  Utils.FETCH_POSTS_THRESHOLD = 50 * Utils.NUM_POSTS_TO_FETCH;

  Utils.getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  Utils.getRandomIcon = function () {
    var icons = ["fa fa-cutlery", "fa fa-lemon-o", "fa fa-anchor", "fa fa-asterisk", "fa fa-bell-o",
                  "fa fa-bell", "fa fa-beer", "fa fa-binoculars", "fa fa-birthday-cake",
                  "fa fa-bolt", "fa fa-book", "fa fa-bullhorn", "fa fa-bullseye", "fa fa-bus",
                  "fa fa-car", "fa fa-camera-retro", "fa fa-cloud", "fa fa-coffee", "fa fa-cogs",
                  "fa fa-compass", "fa fa-cube", "fa fa-cubes", "fa fa-diamond", "fa fa-envelope",
                  "fa fa-envelope-o", "fa fa-eye", "fa fa-eyedropper", "fa fa-fighter-jet",
                  "fa fa-flag", "fa fa-flag-checkered", "fa fa-fire-extinguisher", "fa fa-filter",
                  "fa fa-flask", "fa fa-futbol-o", "fa fa-gamepad", "fa fa-gavel",
                  "fa fa-gift", "fa fa-glass", "fa fa-globe", "fa fa-graduation-cap", "fa fa-heartbeat",
                  "fa fa-key", "fa fa-leaf", "fa fa-lightbulb-o", "fa fa-magnet", "fa fa-magic",
                  "fa fa-moon-o", "fa fa-money", "fa fa-paper-plane", "fa fa-paper-plane-o", "fa fa-paperclip",
                  "fa fa-paint-brush", "fa fa-paw", "fa fa-plug", "fa fa-puzzle-piece", "fa fa-rocket",
                  "fa fa-scissors", "fa fa-shopping-cart", "fa fa-space-shuttle", "fa fa-star", "fa fa-star-half-o",
                  "fa fa-star-o", "fa fa-stethoscope", "fa fa-subway", "fa fa-taxi", "fa fa-thumb-tack",
                  "fa fa-tint", "fa fa-ticket", "fa fa-tree", "fa fa-trophy", "fa fa-truck", "fa fa-umbrella",
                  "fa fa-wrench", "fa fa-user-secret", "fa fa-user", "fa fa-tachometer", "fa fa-headphones",
                  "fa fa-angellist"];
    return icons[Math.floor(Math.random()*icons.length)];
  };


  Utils.validateEmail = function (email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  };

  Utils.getDomain = function (email) {
    var indexAt = email.indexOf("@");
    return email.substr(indexAt+1, email.length);
  };

  Utils.showLoading = function() {
    $('.my-loading-container').show();
  }

  Utils.hideLoading = function() {
    $('.my-loading-container').hide();
  }
});
