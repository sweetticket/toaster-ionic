
Template.download.helpers({
  // counter: function () {
  //   return Session.get('counter');
  // }
});

Template.download.rendered = function () {
  $('body, html, .nav-view-transition-ios.nav-view-direction-forward, .nav-view-transition-ios.nav-view-direction-back')
    .css("background-color", "transparent")
    .css("overflow-y", "scroll");
}

Template.download.events({
//   'click button': function () {
//     // increment the counter when button is clicked
//     Session.set('counter', Session.get('counter') + 1);
//   }
 });

