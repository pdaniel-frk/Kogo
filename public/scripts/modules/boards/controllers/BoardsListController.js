
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var boardsListController = angular.module(
  'BoardsListController',
  [
    'BoardsService',
    'ProjectsService'
  ]
);

boardsListController.controller(
  'BoardsListController',
  [
    "$scope", "$routeParams", "BoardsService", "ProjectsService",
    function ($scope, $routeParams, BoardsService, ProjectsService)
    {
      // route params
      $scope.projectId = $routeParams.projectId;

      // method gets current project
      $scope.getProject = function (projectId) {
        return ProjectsService.getById(projectId)
          .then(function (project) {
            $scope.project = project;
        });
      };

      // method gets all boards
      $scope.getBoards = function (projectId) {
        return BoardsService.get(
            {
              conditions : {
                status: 'active',
                projectId: projectId
              }
            }
          )
          .then(function (boards) {
            $scope.boards = boards;
        });
      };

      $scope.getProject($scope.projectId);
      $scope.getBoards($scope.projectId);
    }
  ]
);
