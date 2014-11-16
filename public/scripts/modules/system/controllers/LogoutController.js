
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var logoutController = angular.module(
  'LogoutController',
  [
    'LogoutService'
  ]
);

logoutController.controller(
  'LogoutController',
  [
    '$scope', 'LogoutService', '$window',
    function ($scope, LogoutService, $window) {

      LogoutService.logout()
      .then(function () {
        $window.location.href = '/';
      });
    }
  ]
);
