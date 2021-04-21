Template.adminPageDashboard.onCreated(function () {
  this.state = new ReactiveDict(null, {
    dashboard: null
  });
});

Template.adminPageDashboard.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get('dashboard');
    LoadingSection.show(self, '.brd-loading-section');

    Meteor.call('admin.dashboard', {}, function (error, result) {
      LoadingSection.hide(self, '.brd-loading-section');

      if (error) {
        ErrorHandler.show(error);
        return;
      }

      self.state.set('dashboard', result.dashboard);
    });
  });
});