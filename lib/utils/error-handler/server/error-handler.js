ErrorHandler = function (error, message, throwError = true, details = null) {
  const _error = new Meteor.Error(error, Accounts._options.ambiguousErrorMessages ? "Something went wrong. Please check your credentials." : message, details);

  if (throwError) {
    throw _error;
  }

  return _error;
}