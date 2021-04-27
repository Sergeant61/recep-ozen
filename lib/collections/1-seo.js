import SimpleSchema from 'simpl-schema';

SeoSchema = new SimpleSchema({
  title: {
    type: String
  },

  keywords: {
    type: String
  },

  description: {
    type: String
  }
});