const routesAuth = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [MustSignIn, IsAdmin],
});

routesAuth.route('/dashboard', {
  name: 'admin.dashboard',
  action: function (params, queryParams) {
    BlazeLayout.render('adminLayoutDefault', { page: 'adminPageDashboard' });
  }
});