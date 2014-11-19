
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var util = require('util');

/**
 * Custom Kogo Error Class
 *
 * @param String  message    Exception message
 * @param Integer statusCode Exception status code
 * @param Mixed   data       Additional exception data
 * @see http://dailyjs.com/2014/01/30/exception-error/
 */
function KogoException(message, statusCode, data) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.message = message;
  this.statusCode = 500;
  if (statusCode) {
    this.statusCode = 500;
  }
  if (data) {
    this.data = data;
  }
}

/**
 * Exception name
 */
KogoException.prototype.name = 'KogoException';

/**
 * Placeholder for exception data
 */
KogoException.prototype.data;

/**
 * Extends Error
 * @type Error
 */
util.inherits(KogoException, Error);

module.exports = KogoException;
