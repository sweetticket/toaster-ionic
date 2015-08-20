if (Meteor.isClient) {
  Template.registerHelper("fromNow", function (createdAt) {
    return moment(this.createdAt).fromNow(true);
  });
}
