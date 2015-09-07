PushUtils = {};

var Pusher = Meteor.npmRequire('pusher');
var PUSHER_LIB = new Pusher({
  appId: '138896',
  key: '3f8ba7f168a24152f488',
  secret: 'b0b9b4bdf3bec67b0bf3',
  encrypted: true
});
PUSHER_LIB.port = 443;

PushUtils.sendPusherNoti = Async.wrap(PUSHER_LIB, 'trigger');
