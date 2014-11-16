
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var sprintsService = angular.module('SprintsService', []);

sprintsService.factory('SprintsService', ['$http', function ($http) {

  var sprintsApiUrl = '/api/sprints';

  return {
    // call to get all boards
    get : function (params) {
      var result = $http.get(
        sprintsApiUrl + (params ? '?' + $.param(params) : '')
      );

      // formatting data
      return result.then(function (response) {
        return response.data;
      });
    },

    getById : function (id) {
      return this.get({'conditions': {'id': id}})
        .then(function (sprints) {
          if (!_.isArray(sprints)) {
            return null;
          }

          return sprints.pop();
        });
    },

    save : function (sprint) {
      if (sprint.id) {
        return this.update(sprint.id, sprint);
      }

      return this.create(sprint);
    },

    // call to POST and create a new sprint
    create : function (sprint) {
      return $http.post(sprintsApiUrl, sprint)
        .then(function (result) {
          return result.data;
        });
    },

    update: function (id, sprint) {
      return $http.put(sprintsApiUrl + '/' + id, sprint)
        .then(function (result) {
          return result.data;
        });
    },

    getByBoardId : function (boardId) {
      return this.get({
        fields : {
          0 : "id",
          1 : "name"
        },
        conditions : {
          boardId : boardId
        }
      });
    }
  }

}]);
