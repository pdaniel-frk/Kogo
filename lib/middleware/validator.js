
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

exports.id = function (req, res, next, id) {
  if (id.match(/^[\-\d]+$/) === null) {
    return res.status(400).json('Bad Request');
  }
  next();
};
