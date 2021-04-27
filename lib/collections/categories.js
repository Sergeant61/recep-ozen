import SimpleSchema from 'simpl-schema';

Categories = new Mongo.Collection('categories');

CategoriesValueSchema = new SimpleSchema({
  title: String,

  description: {
    type: String,
    optional: true
  },

  html: {
    type: String,
    optional: true
  },
});

CategoriesSchema = new SimpleSchema({
  data: {
    type: Object,
    blackbox: true
  },

  'data.$': {
    type: CategoriesValueSchema,
  },

  seo: {
    type: SeoSchema,
    optional: true
  },

  parentCategoryId: {
    type: SimpleSchema.RegEx.Id,
    optional: true
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
// Categories.slugify({ field: 'titles.[0].value' });