PushUtils = {};

// var Pusher = Meteor.npmRequire('pusher');
// var PUSHER_LIB = new Pusher({
//   appId: '138896',
//   key: '3f8ba7f168a24152f488',
//   secret: 'b0b9b4bdf3bec67b0bf3',
//   encrypted: true
// });
// PUSHER_LIB.port = 443;

// Router.route('/pusher/auth', { where: 'server'})
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

// PushUtils.sendPusherNoti = function (channel, eventName, msg) {
//   console.log("triggering PUSH:", channel);
//   PUSHER_LIB.trigger(channel, eventName, {"message": msg});
// }

var PubNub = Meteor.npmRequire('pubnub');

var PUBNUB_LIB = PubNub.init({
    publish_key: 'pub-c-dd908081-bca8-4ce9-85b3-8ab1298cc96e',
    subscribe_key: 'sub-c-4d362456-58ae-11e5-9d31-02ee2ddab7fe'
});

PushUtils.sendPushNoti = function (channel, message) {
  // PUBNUB_LIB.publish({
  //   channel: channel,
  //   message: {
  //     "aps" : {
  //     "alert" : message,
  //     "badge" : 9,
  //     "sound" : "bingbong.aiff"
  //     },
  //     "acme 1" : 42
  //     }
  // });
  PUBNUB_LIB.publish({
    channel: channel,
    message: message
  });

};