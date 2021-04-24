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
    optional: true
  },
});

Categories.attachSchema(CategoriesSchema);
Categories.softRemovable();
Categories.autoDates();
Categories.slugify({ field: 'title' });
