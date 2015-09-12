PushUtils = {};

PARSE_REST_API_KEY = "RkDy0HP4MTzezVx9EGAurlSfsEUcMNNZb1RXkNPh";
PARSE_APP_ID = "nGWY63hAKCyyMHS41xmjNiL4mCIqsJ0TBGWAG4vy";

// PushUtils.testParseSend = function() {
//   console.log("PushUtils.testParseSend() called");
//   $.post("https://api.parse.com/1/push", {
//     "X-Parse-Application-Id": PARSE_APP_ID,
//     "X-Parse-REST-API-Key": PARSE_APP_ID,
//   }, function (data) {
//     console.log("parse push success!");
//     console.log(data);
//     debugger
//   }, "application/json");
// }

PushUtils.testParseSend = function() {
  console.log("PushUtils.testParseSend() called");
  HTTP.post("https://api.parse.com/1/push", {
    params: {
      "X-Parse-Application-Id": PARSE_APP_ID,
      "X-Parse-REST-API-Key": PARSE_APP_ID,
    }
  }, function (success) {
    console.log("PARSE PUSH SUCCESS");
  });
}




// var Pusher = Meteor.require('pusher');
var Pusher = Meteor.npmRequire('pusher');
var PUSHER_LIB = new Pusher({
  appId: '138896',
  key: '3f8ba7f168a24152f488',
  secret: 'b0b9b4bdf3bec67b0bf3',
  encrypted: true
});
PUSHER_LIB.port = 443;

// auth endpoint for private channels
// Router.route('/pusher/auth','POST', function() {
//   console.log("authenticating!");
//     var req = this.request;
//     var res = this.response;
//     var socketId = req.body.socket_id;
//     var channel = req.body.channel_name;
//     var auth = PUSHER_LIB.auth( socketId, channel );
//     res.write(JSON.stringify(auth));
//   }, {where: 'server'});

Router.route('/pusher/auth', { where: 'server'})
  .post(function() {
    // console.log("authenticating!");
    var req = this.request;
    var res = this.response;
    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;
    var auth = PUSHER_LIB.authenticate( socketId, channel );
    console.log("Authorizing Pusher. Channel:", channel);
    console.log("Authorizing Pusher. SocketId:", socketId);
    console.log(JSON.stringify(auth));
    res.write(JSON.stringify(auth));
  });

// Router.route('/parse/auth', { where: 'server'})
//   .post(function() {
//     // console.log("authenticating!");
//     var req = this.request;
//     var res = this.response;
//     var socketId = req.body.socket_id;
//     var channel = req.body.channel_name;
//     var auth = PUSHER_LIB.authenticate( socketId, channel );
//     console.log("Authorizing Pusher. Channel:", channel);
//     console.log("Authorizing Pusher. SocketId:", socketId);
//     console.log(JSON.stringify(auth));
//     res.write(JSON.stringify(auth));
//   });
 

// PushUtils.sendPusherNoti = Async.wrap(PUSHER_LIB, 'trigger');

// PushUtils.sendPusherNoti = Async.wrap(function () {
//   var channel = "private-"+Meteor.userId();
//   console.log("triggering PUSH:", channel);
//   PUSHER_LIB.trigger(channel, 'Toaster', {"message": "hello world"});
// })


// function () {
//   var channel = "private-"+Meteor.userId();
//   console.log("triggering PUSH:", channel);
//   PUSHER_LIB.trigger(channel, 'Toaster', {"message": "hello world"});
// }

PushUtils.sendPusherNoti = function (channel, eventName, msg) {
  console.log("triggering PUSH:", channel);
  PUSHER_LIB.trigger(channel, eventName, {"message": msg});
}

// PushUtils.sendPusherNoti = Async.wrap(function (channel, eventName, msg) {
//   console.log("triggering PUSH:", channel);
//   PUSHER_LIB.trigger(channel, eventName, {"message": msg});
// });




// PUSH NOTIFICATIONS WITH PARSE.JS




