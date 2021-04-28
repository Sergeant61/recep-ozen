Template.userPageBlogs.onCreated(function () {
  this.state = new ReactiveDict(null, {
    blogs: []
  })
});

Template.userPageBlogs.onRendered(function () {
  const self = this

  this.autorun(function () {
    const language = CurrentLocale.get();
    const userId = Meteor.userId();

    if (!language || !userId) {
      return
    }

    const obj = {
      lang: language.slice(0, 2),
      createdUserId: userId
    }

    LoadingLine.show()
    Meteor.call('public.blogs.list', obj, function (_error, _result) {
      LoadingLine.hide()

      if (_error) {
        ErrorHandler.show(_error);
        return;
      }

      console.log(_result.blogs);
      self.state.set('blogs', _result.blogs)
    });
  });
});