
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var sprintModalController = angular.module(
  'SprintModalController',
  [
    'BoardsService',
    'SprintsService'
  ]
);

sprintModalController.controller(
  'SprintModalController',
  [
    "$scope", "$routeParams", "$modalInstance",
    "BoardsService", "SprintsService", "sprint", "projectId",
    function ($scope, $routeParams, $modalInstance,
      BoardsService, SprintsService, sprint, projectId
    ) {

      $scope.modalSprint = sprint;
      $scope.modalBoardId = sprint.boardId;
      $scope.modalProjectId = projectId;

      BoardsService.get(
        {
          conditions: {
            projectId : $scope.modalProjectId
          }
        }).then(function (boards) {
          $scope.modalBoards = boards;
        });

      // method called to create sprint
      $scope.createSprint = function (sprint) {

        if (!_.isObject(sprint)) {
          throw 'Invalid sprint passed';
        }

        return SprintsService.save(sprint);
      }

      // ---------------------------------------------
      // ---------- MODAL RELEATED FUNCTIONS ---------
      // ---------------------------------------------

      /**
       * Function called when 'save' was clicked
       *
       * Role:
       * - validate form input
       *   * if error -> show error
       * - use service to save sprint
       *   * if sucess -> close modal
       *   * else -> show error
       */
      $scope.create = function (sprint) {

        // conversion
        sprint.startDate = moment(sprint.startDate, "DD-MM-YYYY").format('YYYY-MM-DD');
        sprint.endDate = moment(sprint.endDate, "DD-MM-YYYY").format('YYYY-MM-DD');

        // saving ticket
        return $scope.createSprint(sprint)
          .then(function (records) {
            $modalInstance.close(records);
          }, function (error) {
            console.log(error);
          });
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }
  ]
);
