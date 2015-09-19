// var isLoggedIn = function() {
//   if (!Meteor.loggingIn() && !Meteor.user()) {
//     if (Meteor.isClient) {
//       if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
//         setTimeout(function() {
//           alert('start-signup');
//         }, 0);
//       }
//     }
//     FlowRouter.go('signUp');
//     this.next();
//   } else {
//     isVerified.call(this);
//   }
// }

// var isVerified = function() {
//   var user = Meteor.user();
//   if (user) {
//     if (user.emails[0].verified) {
//       this.next();
//     } else {
//       if (Utils.isNativeApp() && Utils.getMobileOperatingSystem() === 'Android') {
//         FlowRouter.go("blank");
//       } else {
//         FlowRouter.go("notVerified");
//       }
//     }
//   } else {
//     this.next();
//   }
// }

// AppController = RouteController.extend({
//   layoutTemplate: 'appLayout'
// });

// TrendingController = AppController.extend({
//   onBeforeAction: function() {
//     isLoggedIn.call(this);
//   },

//   onAfterAction: function() {
//     if (!Utils.isNativeApp()) {
//       FlowRouter.go("download");
//     }
//   }
// });

// RecentController = AppController.extend({
//   onBeforeAction: function() {
//     isLoggedIn.call(this);
//   },

//   onAfterAction: function() {
//     if (!Utils.isNativeApp()) {
//       FlowRouter.go("download");
//     }
//   }
// });

// PostsShowController = AppController.extend({
//   onBeforeAction: function() {
//     isLoggedIn.call(this);
//   },

//   onAfterAction: function() {
//     if (!Utils.isNativeApp()) {
//       FlowRouter.go("download");
//     }
//   }
// });

// UsersShowController = AppController.extend({
//   onBeforeAction: function() {
//     isLoggedIn.call(this);
//   },

//   onAfterAction: function() {
//     if (!Utils.isNativeApp()) {
//       FlowRouter.go("download");
//     }
//   }
// });

// NotificationsController = AppController.extend({
//   onBeforeAction: function() {
//     isLoggedIn.call(this);
//   },

//   onAfterAction: function() {
//     if (!Utils.isNativeApp()) {
//       FlowRouter.go("download");
//     }
//   }
// });

// ProfileController = AppController.extend({
//   onBeforeAction: function() {
//     isLoggedIn.call(this);
//   },

//   onAfterAction: function() {
//     if (!Utils.isNativeApp()) {
//       FlowRouter.go("download");
//     }
//   }
// });

// SignInController = AppController.extend({
//   onAfterAction: function() {
//     if (Utils.getMobileOperatingSystem() === 'iOS') {
//       window.location = "toasterapp://signIn";
//     }

//     if (!Utils.isNativeApp()) {
//       FlowRouter.go("download");
//     }
//   },
// });

// SignUpController = AppController.extend({
//   onAfterAction: function() {
//     if (Utils.getMobileOperatingSystem() === 'iOS') {
//       window.location = "toasterapp://signUp";
//     }

//     if (!Utils.isNativeApp()) {
//       FlowRouter.go("download");
//     }
//   }
// });

// NotVerifiedController = AppController.extend({
// });

// SettingsController = AppController.extend({
//   onBeforeAction: function() {
//     isLoggedIn.call(this);
//   },
  
//   onAfterAction: function() {
//     if (!Utils.isNativeApp()) {
//       FlowRouter.go("download");
//     }
//   }
// });

// NewPostController = AppController.extend({
//   onBeforeAction: function() {
//     isLoggedIn.call(this);
//   },

//   onAfterAction: function() {
//     if (!Utils.isNativeApp()) {
//       FlowRouter.go("download");
//     }
//   }
// });

// AboutController = AppController.extend({
// });

// TermsController = AppController.extend({
// });

// PrivacyController = AppController.extend({
// });

// GetToasterController = AppController.extend({
// });

// BlankController = AppController.extend({
// });

// DownloadController = AppController.extend({
// });
