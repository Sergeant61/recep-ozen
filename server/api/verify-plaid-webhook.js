import compare from 'secure-compare';
import jwt_decode from 'jwt-decode';
import sha256 from 'js-sha256';
const jose = require('jose');

const KEY_CACHE = new Map();

VerifyPlaidWebhook = function(signedJwt, body) {
  const decodedToken = jwt_decode(signedJwt);
  const decodedTokenHeader = jwt_decode(signedJwt, { header: true });
  const currentKeyID = decodedTokenHeader.kid;

  if (!KEY_CACHE.has(currentKeyID)) {
    const keyIDsToUpdate = [];
    KEY_CACHE.forEach((keyID, key) => {
      if (key.expired_at == null) {
        keyIDsToUpdate.push(keyID);
      }
    });

    keyIDsToUpdate.push(currentKeyID);

    for (keyID of keyIDsToUpdate) {
      const verificationKeyResponse = PlaidClient.getWebhookVerificationKeySync(keyID);
      const key = verificationKeyResponse.key;
      KEY_CACHE.set(keyID, key);
    }
  }

  if (!KEY_CACHE.has(currentKeyID)) {
    return false;
  }

  const key = KEY_CACHE.get(currentKeyID);

  if (key.expired_at != null) {
    return false;
  }

  try {
    jose.JWT.verify(signedJwt, key, { maxTokenAge: '5 min' });
  } catch (error) {
    return false;
  }
  
  const bodyHash = sha256(body);
  const claimedBodyHash = decodedToken.request_body_sha256;
  return compare(bodyHash, claimedBodyHash);
}