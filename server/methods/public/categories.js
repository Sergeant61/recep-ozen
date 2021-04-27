import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'public.categories',
  validate: new SimpleSchema({
    lang: String,
  }).validator(),
  run: function (data) {

    const options = {
      fields: {
        _id: 1,
        status: 1
      }
    }

    options.fields[`data.${data.lang}`] = 1

    const result = Fetch(Categories, { status: 'visible', parentCategoryId: { $exists: false } }, options, 'categories');

    result.categories = result.categories.map(category => {
      category.data = category.data[data.lang];
      return category;
    });

    return result
  }
});