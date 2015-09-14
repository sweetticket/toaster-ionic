// startup stuff

Meteor.startup(function() {

  // Set number of posts to fetch at once
  NUM_POSTS_IN_BATCH = 20;

  if (Meteor.isClient) {
    // Set MomentJS English or Korean
    moment.locale('en');
  }

  if (Meteor.isServer) {
    FastRender.route("/", function() {
      this.subscribe("recentPostsAndComments", NUM_POSTS_IN_BATCH);
    });

    FastRender.route("/trending", function() {
      this.subscribe("trendingPostsAndComments");
    });

    // ONLY ON DEVELOPMENT
    if (process.env.NODE_ENV === "development") {
      console.log("---- DEVELOPMENT ENVIRONMENT ----");
    } else {
      console.log("---- PRODUCTION ENVIRONMENT ----");
    }
  }
});
