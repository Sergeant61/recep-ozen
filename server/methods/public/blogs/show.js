import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'public.blogs.show',
  validate: new SimpleSchema({
    id: SimpleSchema.RegEx.Id,
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

    const obj = {
      _id: data.id
    }

    if (data.status) {
      obj.status = data.status
    }

    if (data.createdUserId) {
      obj.createdUserId = data.createdUserId
    }

    const blog = Blogs.findOne(obj, options);
    blog.data = blog.data[data.lang];

    return blog
  }
});