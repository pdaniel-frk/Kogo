
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

kogoApp.factory('LoginService', ['$http', function ($http) {

  return {
    login : function (loginForm) {
      return $http.post('/login', loginForm);
    },
  }
}]);
