
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var commentsService = angular.module('CommentsService', []);

commentsService.factory('CommentsService', ['$http', function ($http) {

  var commentsApiUrl = '/api/comments';

  return {
    // call to get all boards
    get : function (params) {
      var result = $http.get(
        commentsApiUrl + (params ? '?' + $.param(params) : '')
      );

      // formatting data
      return result.then(function (response) {
        return response.data;
      });
    },

    getById : function (id) {
      return this.get({'conditions': {'c.id': id}})
        .then(function (comments) {
          if (!_.isArray(comments)) {
            return null;
          }

          return comments.pop();
        });
    },

    save : function (comment) {
      if (comment.id) {
        return this.update(comment.id, comment);
      }

      return this.create(comment);
    },

    // call to POST and create a new comment
    create : function (comment) {
      return $http.post(commentsApiUrl, comment)
        .then(function (result) {
          return result.data;
        });
    },

    update: function (id, comment) {
      return $http.put(commentsApiUrl + '/' + id, comment)
        .then(function (result) {
          return result.data;
        });
    },
  }

}]);
