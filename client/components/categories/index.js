Template.componentCategories.onCreated(function () {
  this.subscription = null;

  this.subscription?.stop();
  this.subscription = Meteor.subscribe('publish.categories');
})

Template.componentCategories.onDestroyed(function() {
  this.subscription?.stop();
});

Template.componentCategories.helpers({
  categories: function () {
    return Categories.find({}).fetch();
  }
});