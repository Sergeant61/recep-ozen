Template.authPageSignUp.events({
  'submit form': function (event, template) {
    event.preventDefault();
    LoadingSection.show(template, '.authPageSignUp');

    const fullname = event.target.fullname.value;
    const emailAddress = event.target.emailAddress.value;
    const password = Random.id();

    const obj = {
      email: emailAddress,
      password: password,
      profile: {
        fullname: fullname
      }
    };

    Accounts.createUser(obj, function (error, result) {
      if (error) {
        LoadingSection.hide(template, '.authPageSignUp');
        ErrorHandler.show(error);
        return;
      }

      Meteor.call('onboarding.applications.create', {}, function (error, result) {
        LoadingSection.hide(template, '.authPageSignUp');

        if (error) {
          ErrorHandler.show(error, template);
          return;
        }

        const application = result.application;
        const redirect = FlowRouter.getQueryParam('redirect');

        if(redirect) {
          FlowRouter.go(redirect);
        } else {
          FlowRouter.go('onboarding.plaidAccountConnect', {applicationId: application._id});
        }
      });
    });
  }
});