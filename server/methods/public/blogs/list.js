import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'public.blogs.list',
  validate: new SimpleSchema({
    lang: String,
    status: { type: String, optional: true },
    createdUserId: { type: SimpleSchema.RegEx.Id, optional: true },
  }).validator(),
  run: function (data) {

    const options = {
      fields: {
        _id: 1,
        status: 1,
        updatedAt: 1,
        createdAt: 1,
      }
    }

    options.fields[`data.${data.lang}`] = 1

    const obj = {}

    if (data.status) {
      obj.status = data.status
    }

    if (data.createdUserId) {
      obj.createdUserId = data.createdUserId
    }

    const result = Fetch(Blogs, obj, options, 'blogs');

    result.blogs = result.blogs.map(blog => {
      blog.data = blog.data[data.lang];
      return blog;
    });

    return result
  }
});