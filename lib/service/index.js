
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var configuration = require(LIBRARY_PATH + '/configuration');
var _             = require('underscore');
var Exception     = require(LIBRARY_PATH + '/exception');

function KogoService(requestOptions) {
  if (requestOptions) {
    this.setRequestOptions(requestOptions);
  }
}

/**
 * Placeholder for options
 * Those can be injected by consumer otherwise
 * read from app's configuration.
 *
 * @type null|object
 */
KogoService.prototype.requestOptions = null;

KogoService.prototype.setRequestOptions = function (requestOptions) {

  requestOptions = _.extend(
    configuration.get("api"),
    requestOptions
  );

  if (!_.has(requestOptions, "host")) {
    throw new Exception('Host is required request option');
  }

  if (!_.has(requestOptions, "port")) {
    throw new Exception('Port is required request option');
  }

  this.requestOptions = requestOptions;

  return this;
};

KogoService.prototype.getRequestOptions = function () {
  if (!this.requestOptions) {
    this.requestOptions = configuration.get("api");
  }

  return this.requestOptions;
}

module.exports = KogoService;
