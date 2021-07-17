Template.publicPageTodo.onCreated(function () {
  this.state = new ReactiveDict(null, {
    todos: []
  });
});

Template.publicPageTodo.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get('todos');

    Meteor.call('public.todos.list', {}, function (error, result) {
      if (error) {
        console.log('error', error);
        return;
      }

      console.log(result);
      self.state.set('todos', result)
    });
  });

});

Template.publicPageTodo.events({
  'submit form#brdPublicPageTodoCreateForm': function (event, template) {
    event.preventDefault();

    const title = event.target.title.value
    const description = event.target.description.value

    const obj = {
      todo: {
        title: title,
        description: description,
      }
    }

    Meteor.call('public.todos.create', obj, function (error, result) {
      if (error) {
        console.log('error', error);
        return;
      }

      console.log(result);

      AppUtil.refreshTokens.set('todos', Random.id());
      event.target.reset();
    });
  }
});