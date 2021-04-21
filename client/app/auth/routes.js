const routes = FlowRouter.group({
  prefix: '/auth',
  name: 'auth',
  triggersEnter: [MustSignOut],
});

routes.route('/sign-up', {
  name: 'auth.signUp',
  action: function (params, queryParams) {
    BlazeLayout.render('layoutDefault', { page: 'authPageSignUp' });
  }
});

routes.route('/sign-in', {
  name: 'auth.signIn',
  action: function (params, queryParams) {
    BlazeLayout.render('authLayoutDefault', { page: 'authPageSignIn' });
  }
});

routes.route('/forgot-password', {
  name: 'forgor.password',
  action: function (params, queryParams) {
    BlazeLayout.render('authLayoutDefault', { page: 'authPageForgotPassword' });
  }
});

routes.route('/forgot-password-verify', {
  name: 'forgot.password.verify',
  action: function (params, queryParams) {
    BlazeLayout.render('authLayoutDefault', { page: 'authPageForgotPasswordVerify' });
  }
});

FlowRouter.route('/auth/set-password', {
  name: 'set.password',
  action: function (params, queryParams) {
    BlazeLayout.render('authLayoutDefault', { page: 'authPageSetPassword' });
  }
});

FlowRouter.route('/auth/verify-email', {
  name: 'verify.email',
  action: function (params, queryParams) {
    BlazeLayout.render('authLayoutDefault', { page: 'authPageVerifyEmail' });
  }
});