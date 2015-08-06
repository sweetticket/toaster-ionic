Router.route('/', {
  name: 'trending'
});

Router.route('/recent', {
  name: 'recent'
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
