import SimpleSchema from 'simpl-schema';

Categories = new Mongo.Collection('categories');

CategoriesSchema = new SimpleSchema({
  title: String,

  description: {
    type: String,
    optional: true
  },

  html: {
    type: String,
    optional: true
  },

  language: {
    type: String,
    allowedValues: ['tr', 'en'],
  },

  status: {
    type: String,
    allowedValues: ['visible', 'gone'],
  },
});

Categories.attachSchema(CategoriesSchema);
Categories.softRemovable();
Categories.autoDates();
Categories.lastEditUser();
Categories.slugify({ field: 'title' });

Categories.helpers({
  text: function () {
    return this.title;
  },
});