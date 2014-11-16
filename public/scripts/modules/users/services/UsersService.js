
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var usersService = angular.module('UsersService', []);

usersService.factory('UsersService', ['$http', function ($http) {

  var usersApiUrl = '/api/users';

  return {
    // call to get all ticket links
    get : function (params) {
      var result = $http.get(
        usersApiUrl + (params ? '?' + $.param(params) : '')
      );

      // formatting data
      return result.then(function (response) {
        return response.data;
      });
    },

    getById : function (id, params) {
      params = params || {};

      var query = _.extend(params, {'conditions': {'id': id}});

      return this.get(query)
        .then(function (users) {
          if (!_.isArray(users)) {
            return null;
          }

          return users.pop();
        });
    },

    save : function (user) {
      if (user.id) {
        return this.update(user.id, user);
      }

      return this.create(user);
    },

    // call to POST and create a new user
    create : function (user) {
      return $http.post(usersApiUrl, user)
        .then(function (result) {
          return result.data;
        });
    },

    update: function (id, user) {
      return $http.put(usersApiUrl + '/' + id, user)
        .then(function (result) {
          return result.data;
        });
    },

    // returns details of currently logged in user
    getInfo : function () {
      return $http.get('/user')
        .then(function (response) {
          return response.data;
        });
    }
  }

}]);
