Template.componentNavbar.onCreated(function () {
  this.h = 0;
});

Template.componentNavbar.onRendered(function () {
  const self = this;

  $(window).on('scroll.navbar.fixed-top', function () {
    var $nav = $(".navbar.fixed-top");
    self.h = $nav.height() - $(this).scrollTop();
    var $navbarToggler = $(".navbar-toggler");
    var $navbarCollapse = $(".navbar-collapse");
    if ($navbarToggler.hasClass('collapsed') == true || $navbarCollapse.hasClass('show') == true) {
      $nav.addClass('scrolled');
    } else if ($navbarToggler.hasClass('collapsed') == false && $navbarCollapse.hasClass('show') == false) {
      $nav.removeClass('scrolled');
    }
    if (self.h < 50 || $navbarCollapse.hasClass('show') == true) {
      $nav.addClass('scrolled');
    } else {
      $nav.removeClass('scrolled');
    }
  });
});

Template.componentNavbar.events({
  'click .brd-signout': function (event, template) {
    event.preventDefault();
    Meteor.logout(function () {
      FlowRouter.go('/');
    });
  },

  'click .brd-logo': function (event, template) {
    event.preventDefault();
    FlowRouter.go('/')
    goToAnimate('#brdLandingComponentSection1', -90);
  },

  'click .brd-link-menu-1': function (event, template) {
    event.preventDefault();
    FlowRouter.go('/')
    goToAnimate('#brdLandingComponentSection1', -90);
  },

  'click .brd-link-menu-2': function (event, template) {
    event.preventDefault();
    FlowRouter.go('/')
    goToAnimate('#brdLandingComponentSection4', -90);
  },

  'click .brd-link-menu-3': function (event, template) {
    event.preventDefault();
    FlowRouter.go('/')
    goToAnimate('#brdLandingComponentSection5', -90);
  },

  'click .navbar-toggler': function (event, template) {

    var $nav = $(".navbar.fixed-top");
    var $navbarToggler = $(".navbar-toggler");
    if ($navbarToggler.hasClass('collapsed') == false) {
      $nav.addClass('scrolled');
    } else if ($navbarToggler.hasClass('collapsed') == true && $nav.hasClass('collapsed') == false && self.h > 50) {
      Meteor.setTimeout(function () {
        $nav.removeClass('scrolled');
      }, 250);
    }
  },
});