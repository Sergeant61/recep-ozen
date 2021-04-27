import SimpleSchema from 'simpl-schema';

Blogs = new Mongo.Collection('blogs');

BlogsValueSchema = new SimpleSchema({
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

BlogsSchema = new SimpleSchema({
  data: {
    type: Object,
    blackbox: true
  },

  'data.$': {
    type: BlogsValueSchema,
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

Blogs.attachSchema(BlogsSchema);
Blogs.softRemovable();
Blogs.autoDates();
Blogs.lastEditUser();