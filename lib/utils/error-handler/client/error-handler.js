import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Swal from 'sweetalert2';

ErrorHandler = {
  show: function (error, template) {
    console.log(error, template);

    let message;
    if (typeof error === 'string') {
      message = error;
    } else {
      message = error.reason;
    }

    if (typeof error === 'object') {
      if (error.error === 'not-verified') {
        Swal.fire({
          title: Translate('auth.swal.verify', 'title'),
          text: error.reason,
          icon: 'warning',
          showCancelButton: true,
          showConfirmButton: true,
          cancelButtonText: Translate('globals', 'ok'),
          confirmButtonText: Translate('auth.swal.verify', 'confirm')
        }).then((value) => {
          if (!value.isConfirmed) {
            return;
          }

          Meteor.call('auth.resendVerification', function (error, _result) {
            Swal.fire({
              title: Translate('auth.swal.verificationSent', 'title'),
              text: Translate('auth.swal.verificationSent', 'description'),
              icon: 'success',
              showConfirmButton: true,
              confirmButtonText: Translate('globals', 'ok'),
            }).then((value) => {
              FlowRouter.go('/');
            });
          });
        });

        return;
      } else if (error.error == 422 && template) {
        const errors = error.reason.errors;
        Object.keys(errors).forEach(function (key) {
          const elements = template.$(`input[name='${key}']`);

          if (elements.length > 0) {
            template.$(`input[name='${key}']`).addClass('is-invalid').siblings('.invalid-feedback').html(errors[key]);
          } else {
            Swal.fire({
              title: Translate('globals.swal', 'errorTitle'),
              text: errors[key],
              icon: 'error',
              confirmButtonText: Translate('globals', 'ok')
            });
          }
        });

        return;
      } else if (error.error == 404) {
        message = error.reason?.error || '';
      } else if (error.error === 'plaid-error') {
        if (error.reason === 'ITEM_LOGIN_REQUIRED') {
          Swal.fire({
            title: Translate('plaid.swal.itemLoginRequired', 'title'),
            text: Translate('plaid.swal.itemLoginRequired', 'text'),
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: Translate('plaid.swal.itemLoginRequired', 'ignore'),
            confirmButtonText: Translate('plaid.swal.itemLoginRequired', 'update')
          }).then((value) => {
            if (!value.isConfirmed) {
              return;
            }

            FlowRouter.go('application.plaidUpdate', { applicationId: error.details.applicationId });
          });

          return;
        }
      } else if (error.error === 403) {
        Swal.fire({
          title: Translate('auth.swal.accountExists', 'errorTitle'),
          text: error.reason,
          icon: 'warning',
          showCancelButton: true,
          showConfirmButton: true,
          cancelButtonText: Translate('auth.swal.accountExists', 'forgotPassword'),
          confirmButtonText: Translate('auth.swal.accountExists', 'retry')
        }).then((value) => {

          if (value.isConfirmed) {
            FlowRouter.go('auth.signIn');
          } else {
            FlowRouter.go('forgor.password');
          }
        });

        return;
      }
    }

    Swal.fire({
      title: Translate('globals.swal', 'errorTitle'),
      text: message,
      imageUrl: '/assets/images/error.svg',
      confirmButtonText: Translate('globals', 'ok')
    });
  },

  reset: function (template) {
    template.$('input').removeClass('is-invalid');
  }
};