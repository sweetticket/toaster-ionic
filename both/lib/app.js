// startup stuff


Meteor.startup(function() {

  // Set number of posts to fetch at once
  NUM_POSTS_IN_BATCH = 20;

  if (Meteor.isClient) {
    // Set MomentJS English or Korean
    moment.locale('en');
  }

  if (Meteor.isServer) {
    // FastRender.route("/", function() {
    //   this.subscribe("recentPostsAndComments", NUM_POSTS_IN_BATCH);
    // });

    // FastRender.route("/trending", function() {
    //   this.subscribe("trendingPostsAndComments");
    // });

    // Enable cross origin requests for all endpoints
    WebApp.connectHandlers.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", ["Content-Type, Authorization, X-Requested-With"]);
      return next();
    });

    // ONLY ON DEVELOPMENT
    if (process.env.NODE_ENV === "development") {
      console.log("---- DEVELOPMENT ENVIRONMENT ----");
    } else {
      console.log("---- PRODUCTION ENVIRONMENT ----");
    }
  }
});
