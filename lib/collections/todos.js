import SimpleSchema from 'simpl-schema';

Todos = new Mongo.Collection('todos');

TodoSchema = new SimpleSchema({
  
  title: String,

  description: {
    type: String,
    optional: true
  },

  status: {
    type: String,
    allowedValues: ['open', 'closed', 'done', 'cancelled'],
  },

  userId : SimpleSchema.RegEx.Id
});

Todos.attachSchema(TodoSchema);
Todos.softRemovable();
Todos.autoDates();
Todos.lastEditUser();
Todos.createdUser();