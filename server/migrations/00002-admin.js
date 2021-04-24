const slugify = require('slugify');

Migrations.add({
  version: 2,
  name: 'Kategoriler oluşturuluyor',
  up: function () {
    const categories = JSON.parse(Assets.getText('seeds/categories.json'));
    categories.forEach(category => {
      Categories.insert(category);
    });
  }
});