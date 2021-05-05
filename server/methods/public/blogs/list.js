import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'public.blogs.list',
  validate: new SimpleSchema({
    lang: String,
    options: { type: QueryOptionsSchema, optional: true }
  }).validator(),
  run: function (data) {
    data.options = data.options || {}

    data.options.fields = {
      _id: 1,
      status: 1,
      updatedAt: 1,
      createdAt: 1,
    }

    data.options.fields[`data.${data.lang}`] = 1

    const result = Fetch(Blogs, {}, data.options, 'blogs');

    result.blogs = result.blogs.map(blog => {
      blog.data = blog.data[data.lang];
      return blog;
    });

    return result
  }
});