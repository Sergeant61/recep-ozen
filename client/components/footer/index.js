Template.componentFooter.events({
  'click .brd-logo': function (event, template) {
    event.preventDefault();
    FlowRouter.go('/')
    goToAnimate('#brdLandingComponentSection1', -90);
  },
  'click .brd-go-privacy-policy': function (event, template) {
    event.preventDefault();
    FlowRouter.go('/privacy-policy')
    goToAnimate('#brdPrivacyPolicy', -90);
  },
  'click .brd-go-terms-conditions': function (event, template) {
    event.preventDefault();
    FlowRouter.go('/terms-conditions')
    goToAnimate('#brdTermsConditions', -90);
  },
});