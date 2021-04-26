Meteor.publish('publish.categories', function () {
  return Categories.find({ status: 'visible', parentCategoryId: { $exists: false } });
});