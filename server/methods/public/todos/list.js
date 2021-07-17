import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'public.todos.list',
  validate: new SimpleSchema({
    options: { type: QueryOptionsSchema, optional: true }
  }).validator(),
  run: function (data) {
    const { options } = data;

    return Todos.find({}).fetch();



    // const result = Fetch(Blogs, {}, data.options, 'blogs');

    // return result
  }
});