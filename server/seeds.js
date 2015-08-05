Meteor.startup(function() {
  var users = [
    {
      emails: [{
        address: 'nick@exygen.io',
        verified: false,
        primary: true
      }],
      profile: {
        name: 'nickw'
      },
      services: {
        'meteor-developer': {
          id: '2jefqB8rsQ2q3TuRW',
          username: 'nickw',
          emails: [{
            address: 'nick@exygen.io',
            verified: false,
            primary: true
          }]
        }
      }
    }
  ];

  var posts = [
    {
      body: 'Simple Team Inbox for Email and Twitter'
    },
    {
      body: 'Allows schools to analyze student progress and measure teacher performance.'
    },
    {
      body: 'Job marketplace that modernizes the process of hiring for hourly workers.'
    },
    {
      body: 'Educational role-playing game that teachers and students play together in the classroom.'
    },
    {
      body: 'Tinder for job hunting.'
    },
    {
      body: 'Makes recording mobile user experiences and bugs a breeze.'
    },
    {
      body: 'A personal roadmap to dress better. Cladwell makes clothing simple.'
    },
    {
      body: 'Analytics That Grow Your Business'
    },
    {
      body: 'Schedule group meetings painlessly'
    },
    {
      body: 'Easily Collect, Analyze & Share Data'
    },
    {
      body: 'A collaborative and fully reactive drum machine.'
    },
    { 
      body: 'Mixmax gives your Gmail superpowers. Schedule meetings 10x faster.'
    }
  ];

  if (Meteor.users.find({}).count() === 0) {
    _(users).each(function (user) {
      Meteor.users.insert(user);
    });
  }

  var author = Meteor.users.find().fetch()[0];
  if (Posts.find({}).count() === 0) {
    _(posts).each(function (product) {
      Posts.insert({
        userId: author._id,
        body: product.body,
        createdAt: new Date()
      });
    });
  }
});
