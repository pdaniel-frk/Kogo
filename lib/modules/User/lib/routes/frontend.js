
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var logger = require(LIBRARY_PATH + '/logger');

exports.getDetails = function (req, res) {
  logger.info(req.method + ' request: ' + req.url);

  return res.status(200).json(req.user);
};
