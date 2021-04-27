import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic';

// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';

Template.userPageBlogCreate.onCreated(function () {

  this.ckEditor = null;
});

Template.userPageBlogCreate.onRendered(function () {
  const self = this;

  this.autorun(function () {
    Meteor.setTimeout(function () {
      ClassicEditor
        .create(self.find('#brdBlogHtml'), {
          // plugins: [Base64UploadAdapter],
          // removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed'],
        })
        .then(editor => {
          self.ckEditor = editor;
        })
        .catch(error => {
          console.error(error);
        });
    }, 50);
  });
});

Template.userPageBlogCreate.events({
  'submit form': function (event, template) {
    event.preventDefault();
    ErrorHandler.reset(template);
    LoadingSection.show(template, '.brd-loading-section');

    const currentSlug = AppUtil.currentSlug.get();
    const salesSlug = AppUtil.salesSlug.get();
    const name = event.target.name.value;
    const description = template.ckEditor.getData();
    const price = parseFloat(event.target.price.value);
    const barcode = event.target.barcode.value;
    const isActive = event.target.isActive.checked;
    const categories = template.categories.get();
    const images = template.images.get();
    const extras = template.extras.get();
    const variants = template.variants.get();
    const _variants = variants.filter(function (variant) {
      return variant.optionValueIds.length > 0
    }).map(function (variant) {
      delete variant.isNew;
      return variant;
    });

    const obj = {
      slug: currentSlug,
      salesSlug: salesSlug,

      product: {
        name: name,
        description: description,
        price: price,
        barcode: barcode,
        images: images,
        isActive: isActive,

        categoryIds: categories.map(function (category) {
          return category._id
        }),
      },

      extras: extras.map(function (extra) {
        delete extra.isNew;
        return extra;
      }),

      variants: _variants
    };

    Meteor.call('whatsgoo.sales.products.create', obj, function (error, result) {
      LoadingSection.hide(template, '.brd-loading-section');

      if (error) {
        ErrorHandler.show(error, template);
        return;
      }

      AppUtil.refreshTokens.set('products', Random.id());
      template.modal.hide();
      template.images.set([]);
      template.extras.set([]);
      template.variants.set([]);
      template.categories.set([]);
      event.target.reset();
      template.ckEditor.setData('')
    });
  }
});