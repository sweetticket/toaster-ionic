Router.route('/', {
  name: 'recent'
});

Router.route('/trending', {
  name: 'trending'
});

Router.route('/posts/:_id', {
  name: 'posts.show'
});

Router.route('/users/:_id', {
  name: 'users.show'
});

Router.route('/notifications', {
  name: 'notifications'
});

Router.route('/profile', {
  name: 'profile'
});

// These can be treated as modals as well
Router.route('/signIn', {
  name: 'signIn'
});

Router.route('/signUp', {
  name: 'signUp'
});

Router.route('/notVerified', {
  name: 'notVerified'
});

Router.route('/settings', {
  name: 'settings'
});

Router.route('/settings/about', {
  name: 'about'
});

Router.route('/settings/terms', {
  name: 'terms'
});

Router.route('/settings/privacy', {
  name: 'privacy'
});

Router.route('/getToaster', {
  name: 'getToaster'
});

