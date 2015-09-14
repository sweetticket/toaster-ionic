Meteor.startup(function() {
  Utils = {};

  Utils.HEADER_CHANGE_THRESHOLD = 150;
  Utils.NUM_POSTS_TO_FETCH = 5;
  Utils.FETCH_POSTS_THRESHOLD = 50 * Utils.NUM_POSTS_TO_FETCH;

  Utils.getMobileOperatingSystem = function() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
    {
      return 'iOS';
    }
    else if( userAgent.match( /Android/i ) )
    {
      return 'Android';
    }
    else
    {
      return 'unknown';
    }
  };

  Utils.isNativeApp = function() {
    return /Toaster\/[0-9\.]+$/.test(navigator.userAgent);
  };

  Utils.getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  Utils.getNameTag = function() {
    var adjectives = ['Green', 'Red', 'Yellow', 'Blue', 'Purple', 'Black', 'White', 'Ivory',
                      'Beige', 'Rosy', 'Orange', 'Pink', 'Coral', 'Neon', 'Silver', 'Golden',
                      'Platnum', 'Wondrous', 'Magical', 'Minty', 'Saucy', 'Spicy', 'Sleepy',
                      'Dewy', 'Glistening', 'Sparkly', 'Wet', 'Dry', 'Hyper', 'Rich', 'Cool',
                      'Hot', 'Tall', 'Short', 'Round', 'Slim', 'Frozen', 'Furry', 'Fuzzy',
                      'Fine', 'Average', 'Cute', 'Litte', 'Petite', 'Sweet', 'Nice', 'Indigo',
                      'Brown', 'Sandy', 'Salty', 'Melting', 'Shiny', 'Matte', 'Candied',
                      'Fried', 'Iced', 'Milky', 'Toasted', 'Tangy', 'Bouncy', 'Squishy',
                      'Bland', 'Sour', 'Special', 'Yummy', 'Sequined', 'Slick', 'Smooth',
                      'Boiling', 'Sweaty', 'Crunchy', 'Chewy', 'Tender', 'Strong',
                      'Aromatic', 'Juicy', 'Crispy', 'Frosted', 'Jiggly', 'Scented', 'Soothing',
                      'Heavenly', 'Healthy', 'Quirky', 'Bedazzled', 'Big', 'Small', 'Yummy',
                      'Soft', 'Simple', 'Active', 'Fresh', 'Exotic', 'Glowing', 'Giant',
                      'Fluffy', 'Solid', 'Perky', 'Colorful', 'Rainbow', 'Violet',
                      'Maroon', 'Electric', 'Clean', 'Neat', 'Sharp', 'Loud', 'Real', 'Boxed',
                      'Bejeweled', 'Pampered', 'Flexible', 'Decadent', 'Meaty', 'Ground',
                      'Sizzling', 'Fruity', 'Tasty', 'Dancing', 'Elegant', 'Metalic',
                      'Singing', 'Swimming'];
    var foods = ['Jelly', 'Apple', 'Avocado', 'Peach', 'Broccoli', 'Ramen', 'Noodle',
                  'Soup', 'Chicken', 'Shrimp', 'Fish', 'Turkey', 'Egg', 'Toast', 'Bread',
                  'Sandwich', 'Lime', 'Lemon', 'Hotdog', 'Burger', 'Berry', 'Beet',
                  'Cereal', 'Radish', 'Cupcake', 'Cake', 'Candy', 'Lollipop', 'Steak',
                  'Pasta', 'Udon', 'Sushi', 'Rice', 'Pizza', 'Coffee', 'Tea', 'Banana',
                  'Yam', 'Potato', 'Yogurt', 'Fruit', 'Tomato', 'Pork', 'Salad',
                  'Beer', 'Martini', 'Grape', 'Carrot', 'Kale', 'Oat', 'Almond',
                  'Walnut', 'Chip', 'Mayo', 'Ketchup', 'Mustard', 'Pepper', 'Salt',
                  'Bean', 'Nut', 'Salmon', 'Cod', 'Pear', 'Lychee', 'Dumpling',
                  'Sundae', 'Popsicle', 'Lollipop', 'Macaroon', 'Celery',
                  'Pancake', 'Scone', 'Taco', 'Burrito', 'Omelette', 'Veal', 'Curry',
                  'Bacon', 'Waffle', 'Fries', 'Parfait', 'Raisin', 'Slushie', 'Milk',
                  'Cheese', 'Cracker', 'Cookie', 'Brownie', 'Cocktail', 'Smoothie',
                  'Butter', 'Macaroni', 'Juice', 'Mango', 'Ice', 'Mushroom', 'Lettuce',
                  'Cabbage', 'Cucumber', 'Plum', 'Onion', 'Garlic', 'Prune', 'Biscuit',
                  'Spinach', 'Tofu', 'Corn', 'Sub', 'Bagel', 'Donut', 'Jam', 'Peanut',
                  'Cashew', 'Pumpkin', 'Squash', 'Tuna', 'Shumai', 'Lobster', 'Crab',
                  'Scallop', 'Lasagna', 'Ham', 'Pea', 'Eggplant', 'Honey', 'Cream',
                  'Tart', 'Jerky', 'Ravioli', 'Popcorn', 'Nacho', 'Guac', 'Sausage',
                  'Wrap', 'Icecream', 'Ranch', 'Eggnog', 'Latte', 'Papaya', 'Guava',
                  'Salami', 'Gum'];

    var randomAdjective = adjectives[Math.floor(Math.random()*adjectives.length)];
    var randomFood = foods[Math.floor(Math.random()*foods.length)];
    return randomAdjective + randomFood;

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

  Utils.getRandomString = function (length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
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

  var getRank = function (post) {
    /* Score = P / (T+2)^G
    P = points of an item (can subtract 1 to negate submitters vote if you want)
    T = time since submission (in hours)
    G = Gravity, ie. 1.8
    */
    var now = moment();

    var T = now.diff(post.createdAt, 'hours');
    var P = post.numLikes;
    var G = 1.8;
    return P / Math.pow(T+2, G);
  }

  Utils.compareRank = function (a, b) {
    if (getRank(a) > getRank(b))
      return -1;
    if (getRank(a) < getRank(b))
      return 1;
    return 0;
  }

  Utils.tellIOSLoadingStarted = function (delay) {
    if (Utils.getMobileOperatingSystem() === 'iOS') {
      var delay = delay || 100;
      setTimeout(function() {
        // This 50ms delay is important.
        // Even when the subscription is ready, we still need
        // extra time for everything to be rendered
        console.log("told iOs loading started")
        window.location.href = "toasterapp://loadingStart";
      }, delay);
    }
  }

  Utils.tellIOSLoadingEnded = function (delay) {
    var delay = delay || 100;
    if (Utils.getMobileOperatingSystem() === 'iOS') {
      setTimeout(function() {
        console.log("told iOs loading ended")
        window.location.href = "toasterapp://loadingEnd";
      }, delay);
    }
  }

  Utils.tellIOSILoggedOut = function (delay) {
    var delay = delay || 100;
    if (Utils.getMobileOperatingSystem() === 'iOS') {
      setTimeout(function() {
        console.log("told iOS I logged Out")
        window.location.href = "toasterapp://loggedOut";
      }, delay);
    }
  }

  Utils.tellIOSILoggedIn = function (isVerified) {
    if (Utils.getMobileOperatingSystem() === 'iOS') {
      setTimeout(function() {
        if (isVerified) {
          window.location.href = "toasterapp://loggedIn&verified";
        } else {
          window.location.href = "toasterapp://loggedIn";
        }
      }, 100);
    }
  }

  Utils.tellAndroidLoadingEnded = function() {
    if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === "Android") {
        setTimeout(function() {
          alert("loadingEnd");
        }, 0);
      }
  }

  Utils.tellIOSToUpdateBadgeCount = function (numUnread) {
    if (Utils.getMobileOperatingSystem() === 'iOS') {
      setTimeout(function() {
        if (numUnread > 0) {
          window.location.href = "toasterapp://badge?count="+numUnread;  
        }
      }, 100);
    }
  }

  Utils.tellAndroidToSetBadgeCount = function(numUnread) {
    if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
      setTimeout(function() {
        if (numUnread > 0) {
          alert('badgeCount:'+ numUnread); 
        }
      }, 100);
    }
  }

  Utils.tellIOSToOpenTab = function (tabName) {
    if (Utils.getMobileOperatingSystem() === 'iOS') {
      setTimeout(function() {
        window.location.href = "toasterapp://" + tabName;  
      }, 100);
    }
  }

  Utils.tellAndroidNotVerified = function() {
    if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
      setTimeout(function() {
          alert('notVerified'); 
      }, 100);
    }
  }

  Utils.tellAndroidIsVerified = function() {
    if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
      setTimeout(function() {
          alert('isVerified'); 
      }, 100);
    }
  }

  Utils.tellIOSScheme = function (scheme) {
    if (Utils.getMobileOperatingSystem() === 'iOS') {
      setTimeout(function() {
        window.location.href = "toasterapp://" + scheme;  
      }, 100);
    }
  }

  Utils.tellIOSNotVerified = function() {
    if (Utils.getMobileOperatingSystem() === 'iOS') {
      setTimeout(function() {
        window.location.href = "toasterapp://notVerified";  
      }, 100);
    }
  }

  Utils.openApp = function() {
    if (Utils.getMobileOperatingSystem() === 'iOS') {
      setTimeout(function() {
        window.location.href = "com.honeyjam.toaster://verified";  
      }, 100);
    } else if (Utils.getMobileOperatingSystem() === 'Android') {
      setTimeout(function() {
        window.location.href = "intent://com.honeyjam.toaster";  
      }, 100);
    }
  }

  Utils.isUserVerified = function (user) {
    return user.emails[0].verified;
  }

  Utils.initGA = function() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-51592195-10', 'auto');
  }

  Utils.tellAndroidSignedInVerified = function() {
    if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
      setTimeout(function() {
          alert('isSignedInVerified'); 
      }, 100);
    }
  }
});
