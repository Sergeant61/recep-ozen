import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'public.todos.create',
  validate: new SimpleSchema({
    todo: TodoSchema.omit('status', 'userId'),
  }).validator(),
  run: function (data) {
    const { todo } = data;

    todo.status = 'open';
    todo.userId = Meteor.userId();

    const id = Todos.insert(todo);

    return Todos.findOne({ _id: id });

  }
});