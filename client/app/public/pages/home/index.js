Template.publicPagehome.onRendered(function () {
  const self = this;
  window.scrollTo(0, 0);
  LoadingLine.show()

  Meteor.setTimeout(function() { 
  LoadingLine.hide()
     
  }, 5000);
});
