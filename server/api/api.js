const bodyParser = require('body-parser');

Picker.middleware(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}));

Picker.middleware(bodyParser.urlencoded({ extended: false }));

Picker.route('/api/plaid', function (params, request, response, next) {
  const body = request.body;
  const rawBody = request.rawBody;
  const headers = request.headers;
  // console.log('/api/plaid', body);

  if(body.error) {
    response.end();
    return;
  }

  const signedJwt = headers['plaid-verification'];
  const isVerified = VerifyPlaidWebhook(signedJwt, rawBody);

  if(!isVerified) {
    response.end();
    return;
  }

  if (body.webhook_type === 'TRANSACTIONS') {
    if(body.webhook_code === 'TRANSACTIONS_REMOVED') {
      WebhookPlaidTransactionsRemoved(body);
    } else {
      WebhookPlaidTransactions(body);
    }
  } else if (body.webhook_type === 'ITEM') {
    if(body.webhook_code === 'PENDING_EXPIRATION') {
      WebhookPlaidPendingExpiration(body);
    }
  } else if (body.webhook_type === 'ASSETS') {
    if(body.webhook_code === 'PRODUCT_READY') {
      WebhookPlaidAssetProductReady(body);
    } else if(body.webhook_code === 'ERROR') {
      WebhookPlaidAssetError(body);
    }
  }

  response.end();
});

