Template.registerHelper('objectToArray', function (a) {
  return Object.keys(a).map(function(key) {
    return {
      key: key,
      value: a[key]
    };
  });
});