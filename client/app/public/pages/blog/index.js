import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.publicPageBlog.onCreated(function () {
  this.state = new ReactiveDict(null, {
    blog: null
  })
});

Template.publicPageBlog.onRendered(function () {
  const self = this

  this.autorun(function () {
    const id = FlowRouter.getParam('id');
    const language = CurrentLocale.get();
    const userId = Meteor.userId();

    if (!language || !userId || !id) {
      return
    }

    const obj = {
      id: id,
      lang: language.slice(0, 2),
      createdUserId: userId
    }

    LoadingLine.show()
    Meteor.call('public.blogs.show', obj, function (_error, _result) {
      LoadingLine.hide()

      if (_error) {
        ErrorHandler.show(_error);
        return;
      }

      console.log(_result);
      self.state.set('blog', _result)
    });
  });
});