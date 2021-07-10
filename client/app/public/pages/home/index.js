Template.publicPagehome.onCreated(function () {
  console.log(this);
  this.state = new ReactiveDict(null, {
    news: [],
    country: 'tr',
    tag: 'general',
  });

  //* this
});

Template.publicPagehome.onRendered(function () {
  //* this
  const self = this;

  this.autorun(function () {
    const country = self.state.get('country');
    const tag = self.state.get('tag');

    Loading.show();
    $.ajax({
      type: "GET",
      url: `https://api.collectapi.com/news/getNews?country=${country}&tag=${tag}`,
      headers: {
        authorization: 'apikey 70VbLGYAZrscxfPtOQVQ19:72zSoBsNtCWF438V8ey8BH',
        'content-type': 'application/json'
      },
    }).done(function (result) {
      Loading.hide();

      console.log(result);

      self.state.set('news', result.result);
    });
  });

});

Template.publicPagehome.events({
  'change #country': function (event, template) {
    event.preventDefault();

    template.state.set('country', event.target.value);

  },

  'change #tag': function (event, template) {
    event.preventDefault();

    template.state.set('tag', event.target.value);

  }
});