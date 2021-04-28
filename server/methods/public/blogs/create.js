import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'public.blogs.create',
  validate: new SimpleSchema({
    blog: BlogsSchema,
  }).validator(),
  run: function (data) {
    Blogs.insert(data.blog);
  }
});