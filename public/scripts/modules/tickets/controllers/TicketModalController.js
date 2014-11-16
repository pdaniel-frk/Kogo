
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var ticketModalController = angular.module(
  'TicketModalController',
  [
    'TicketLinksService',
    'UsersService',
    'TicketsService',
    'SprintsService',
    'LanesService'
  ]
);

ticketModalController.controller(
  'TicketModalController',
  [
    "$scope", "$routeParams", "$q", "$modalInstance",
    "TicketLinksService", "UsersService",
    "TicketsService", "SprintsService", "LanesService",
    "ticket", "projectId", "boardId", "laneId",
    function ($scope, $routeParams, $q, $modalInstance,
      TicketLinksService, UsersService,
      TicketsService, SprintsService, LanesService,
      ticket, projectId, boardId, laneId
    ) {

      $scope.modalTicket = _.extend({}, ticket);
      $scope.modalProjectId = projectId;
      $scope.modalBoardId = boardId;
      $scope.modalLaneId = laneId;

      UsersService.get(
        {
          conditions : {
            roleId : 3
          }
        })
        .then(function (users) {
          $scope.modalUsers = users;

          if (!$scope.modalTicket.assigneeId) {
            return;
          }

          var index, user;
          for (index = 0; index < users.length; index++) {
            user = users[index];
            if (user.id == $scope.modalTicket.assigneeId) {
              $scope.modalTicket.assignee = user;
            }
          }
        });

      SprintsService.get({
        fields : ["id", "name", "startDate", "endDate"],
        conditions : {
          boardId : $scope.modalBoardId,
          status : 'active'
        }
      }).then(function (sprints) {
        $scope.modalSprints = sprints;
      });

      LanesService.get({
        fields : ["id", "name"],
        conditions : {
          boardId : $scope.modalBoardId,
          status : 'active'
        }
      }).then(function (lanes) {
        $scope.modalLanes = lanes;
      });

      // method called to create ticket
      $scope.createTicket = function (ticket) {

        if (!_.isObject(ticket)) {
          throw 'Invalid ticket passed';
        }

        // convert assignee to assigneeId
        ticket.assigneeId = ticket.assignee.id;
        var assignee = ticket.assignee;
        var sprint = ticket.sprint;
        var laneId = ticket.laneId;

        return TicketsService.save(ticket)
          .then(function (ticket) {

            ticket.assignee = assignee;

            var ticketLink = {
              ticketId : ticket.id,
              boardId : $scope.modalBoardId,
              projectId : $scope.modalProjectId,
              laneId : $scope.modalLaneId
            };

            // if sprint was set
            if (sprint) {
              ticketLink.sprintId = sprint.id;
            }

            // if lane was set
            if (laneId) {
              ticketLink.laneId = parseInt(laneId);
            }

            return TicketLinksService.save(ticketLink)
              .then(function (ticketLink) {
                return [ticket, ticketLink];
              });
          });
      }

      // method called to update ticket
      $scope.updateTicket = function (ticket) {

        if (!_.isObject(ticket)) {
          throw 'Invalid ticket passed';
        }

        // convert assignee to assigneeId
        ticket.assigneeId = ticket.assignee.id;
        var assignee = ticket.assignee;
        var creator  = ticket.creator;

        return TicketsService.save(ticket)
          .then(function (ticket) {

            ticket.assignee   = assignee.username;
            ticket.assigneeId = assignee.id;
            ticket.creator    = creator;

            return ticket;
          });
      }

      // ---------------------------------------------
      // ---------- MODAL RELEATED FUNCTIONS ---------
      // ---------------------------------------------

      /**
       * Function called when 'create ticket' was clicked
       *
       * Role:
       * - validate form input
       *   * if error -> show error
       * - use service to save ticket
       *   * if sucess -> close modal
       *   * else -> show error
       */
      $scope.create = function (ticket) {

        // validation

        // saving ticket
        return $scope.createTicket(ticket)
          .then(function (records) {
            $modalInstance.close(records);
          }, function (error) {
            console.log(error);
          });
      };

      /**
       * Function called when 'update ticket' was clicked
       *
       * Role:
       * - validate form input
       *   * if error -> show error
       * - use service to save ticket
       *   * if sucess -> close modal
       *   * else -> show error
       */
      $scope.update = function (ticket) {

        // validation

        // saving ticket
        return $scope.updateTicket(ticket)
          .then(function (ticket) {
            $modalInstance.close(ticket);
          }, function (error) {
            console.log(error);
          });
      };

      /**
       * Cancel method called when 'cancel' button
       * was clicked
       */
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      $scope.activateEditor = function () {
        $('.ta-toolbar').show();
      };

      $scope.deactivateEditor = function () {
        $('.ta-toolbar').hide();
      };
    }
  ]
);
