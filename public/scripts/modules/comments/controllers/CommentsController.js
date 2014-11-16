
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var commentsController = angular.module(
  'CommentsController',
  [
    'CommentsService'
  ]
);

commentsController.controller(
  'CommentsController',
  [
    "$scope", "CommentsService",
    function ($scope, CommentsService)
    {
      // default value
      $scope.comments = [];

      // get Comments service
      CommentsService.get()
        .then(function (comments) {
          $scope.comments = comments;
        });
    }
  ]
);
