import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPagehome' });
  }
});

FlowRouter.route('/todo', {
  name: 'public.todo',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageTodo' });
  }
});

FlowRouter.route('/blog/:id', {
  name: 'public.blog',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageBlog' });
  }
});