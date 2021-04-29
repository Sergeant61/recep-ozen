Template.componentCategories.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: []
  });
});

Template.componentCategories.onRendered(function () {
  const self = this

  this.autorun(function () {
    const language = CurrentLocale.get();

    if (!language) {
      return
    }

    LoadingLine.show()
    Meteor.call('public.categories.list', { lang: language.slice(0, 2) }, function (_error, _result) {
      LoadingLine.hide()

      if (_error) {
        ErrorHandler.show(_error);
        return;
      }

      console.log(_result.categories);
      self.state.set('categories', _result.categories)

    });
  });
});