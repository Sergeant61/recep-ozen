import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'public.categories.list',
  validate: new SimpleSchema({
    lang: String,
    options: { type: QueryOptionsSchema, optional: true }
  }).validator(),
  run: function (data) {
    data.options = data.options || {};

    data.options.fields = {
      _id: 1,
      status: 1,
      updatedAt: 1,
      createdAt: 1,
    }

    data.options.fields[`data.${data.lang}`] = 1

    const result = Fetch(Categories, {}, data.options, 'categories');

    result.categories = result.categories.map(category => {
      category.data = category.data[data.lang];
      return category;
    });

    return result
  }
});