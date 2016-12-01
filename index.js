'use strict';

const crypto = require('crypto');
const bs58   = require('bs58');


/**
 * Generate an access token.
 *
 * @param {Number} type   Token type (1-255).
 * @param {String} secret Secret key for sha256 HMAC.
 */
function generate(type, secret) {
  const bytes = crypto.randomBytes(32);
  bytes.writeUInt8(type, 0);

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(bytes);

  return bs58.encode(Buffer.concat([ hmac.digest(), bytes]));
}


/**
 * Validate token.
 *
 * @param {String} access_token
 * @param {String} secret       Secret key for sha256 HMAC.
 * @returns {Number} 0 if token invalid or token type (1-255).
 */
function validate(access_token, secret) {
  if (typeof access_token !== 'string' || access_token.length < 86 || access_token.length > 88) {
    return 0;
  }

  let buf;

  try {
    buf = new Buffer(bs58.decode(access_token));
  }
  catch (e) {
    return 0;
  }

  if (!buf || buf.length !== 64) {
    return 0;
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(buf.slice(32));

  if (!hmac.digest().equals(buf.slice(0, 32))) {
    return 0;
  }

  return buf.readUInt8(32);
}


module.exports.generate = generate;
module.exports.validate = validate;
