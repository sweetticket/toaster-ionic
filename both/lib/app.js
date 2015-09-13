// startup stuff

Meteor.startup(function() {
  if (Meteor.isClient) {

    // Set number of posts to fetch at once
    NUM_POSTS_IN_BATCH = 20;

    // Set MomentJS English or Korean
    moment.locale('en');
  }
});
