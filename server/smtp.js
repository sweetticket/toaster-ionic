Meteor.startup(function () {
  smtp = {
    username: 'woniesong92',
    password: 'xhtmxj12',
    server:   'smtp.sendgrid.net',
    port: 587
  };

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) +
  ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) +
  ':' + smtp.port;
});
