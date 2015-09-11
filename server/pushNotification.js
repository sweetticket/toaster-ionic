PushUtils = {};

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
    console.log(JSON.stringify(auth));
    res.write(JSON.stringify(auth));
    // res.send(JSON.stringify(auth));
  });

PushUtils.sendPusherNoti = Async.wrap(PUSHER_LIB, 'trigger');