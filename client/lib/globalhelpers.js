if (Meteor.isClient) {

  // moment.fn.fromNowOrNow = function (a) {
  //   if (Math.abs(moment().diff(this)) < 25000) { // 25 seconds before or after now
  //       return 'Just now';
  //   }
  //   return this.fromNow(a);
  // };

  Template.registerHelper("fromNow", function (createdAt) {
    moment.locale('en', {
        relativeTime : {
            future: "in %s",
            past:   "%s",
            s:  "Just now",
            m:  "1m",
            mm: "%dm",
            h:  "1h",
            hh: "%dh",
            d:  "1d",
            dd: "%dd",
            M:  "1mon",
            MM: "%dmon",
            y:  "1y",
            yy: "%dy"
        }
    });
    return moment(this.createdAt).fromNow(true);
  });
}
