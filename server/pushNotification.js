PARSE_REST_API_KEY = "RkDy0HP4MTzezVx9EGAurlSfsEUcMNNZb1RXkNPh";
PARSE_APP_ID = "nGWY63hAKCyyMHS41xmjNiL4mCIqsJ0TBGWAG4vy";

Meteor.methods({
  // When the user logs in, he needs to update his userId to Parse
  // to make a connection between his deviceToken and his Toaster userId
  registerUserIdToParse: function (installationId) {
    var userId = this.userId;
    if (!userId) return false;

    console.log("register to Parse. ObjID:", installationId, "userID:", this.userId);

    var resp = HTTP.put("https://api.parse.com/1/installations/"+installationId, {
      headers: {
        "X-Parse-Application-Id": PARSE_APP_ID,
        "X-Parse-REST-API-Key": PARSE_REST_API_KEY,
        "Content-Type": "application/json"
      },
      data: {
        userId: userId
      }
    });

    console.log(resp);
  },

  // This is an API call to send push notification to the specified user
  // through Parse server
  sendPushNotiToParse: function (userId, msg) {
    console.log("sendPushNotiToParse() called with", userId, msg);

    // FIXME: there is a problem with this!
    var numUnreadNotis = Meteor.call("getNumUnreadNotis", userId);

    console.log("numUnreadNotis:", numUnreadNotis);

    var result = HTTP.post("https://api.parse.com/1/push", {
      headers: {
        "X-Parse-Application-Id": PARSE_APP_ID,
        "X-Parse-REST-API-Key": PARSE_REST_API_KEY,
        "Content-Type": "application/json"
      },
      data: {
        where: {
          userId: userId
        },
        data: {
          alert: msg,
          sound: "default",
          badge: numUnreadNotis
        }
      }
    });

    console.log(result)
  }
})
