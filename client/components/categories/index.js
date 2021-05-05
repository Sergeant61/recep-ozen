Template.componentCategories.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: []
  });

  this.filtering = new ReactiveDict(null, {});
});

Template.componentCategories.onRendered(function () {
  const self = this

  this.autorun(function () {
    const language = CurrentLocale.get();
    const filtering = self.filtering.all()

    if (!language) {
      return
    }

    filtering.parentCategoryId = { $exists: false };
    filtering.status = 'visible';

    const obj = {
      lang: language.slice(0, 2),
      options: {
        filtering: self.filtering.all()
      }
    }

    LoadingLine.show()
    Meteor.call('public.categories.list', obj, function (_error, _result) {
      LoadingLine.hide()

      if (_error) {
        ErrorHandler.show(_error);
        return;
      }

      self.state.set('categories', _result.categories)
    });
  });
});