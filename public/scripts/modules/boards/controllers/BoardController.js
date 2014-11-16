
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var boardController = angular.module(
  'BoardController',
  [
    'BoardsService',
    'TicketLinksService',
    'LanesService',
    'ProjectsService',
    'SprintsService',
    'UsersService',
    'TicketsService'
  ]
);

boardController.controller(
  'BoardController',
  [
    "$scope", "$routeParams", "$q", "$modal", "BoardsService", "TicketLinksService",
    "LanesService", "ProjectsService", "SprintsService", "UsersService", "TicketsService",
    function ($scope, $routeParams, $q, $modal, BoardsService, TicketLinksService,
      LanesService, ProjectsService, SprintsService, UsersService, TicketsService
    ) {

      // route params
      $scope.projectId = $routeParams.projectId;
      $scope.boardId   = $routeParams.boardId;
      $scope.sprints = [];
      $scope.users = [];
      $scope.filters = {
        sprints : [],
        assignees : []
      }

      $scope.parseRouteParams = function () {

        // getting sprints from URL
        if ($routeParams.sprints) {
          var routeSprints = $routeParams.sprints;
          if (!_.isArray(routeSprints)) {
            routeSprints = [routeSprints];
          }

          var sprints = [];
          var index, sprintId, subIndex, sprint;
          for (index = 0; index < routeSprints.length; index++) {
            sprintId = routeSprints[index];

            for (subIndex = 0; subIndex < $scope.sprints.length; subIndex++) {
              sprint = $scope.sprints[subIndex];
              if (sprint.id == sprintId) {
                sprints.push(sprint);
                break;
              }
            }
          }

          $scope.filters.sprints = sprints;
        }

        // getting assignees from URL
        if ($routeParams.assignees) {
          var routeAssignees = $routeParams.assignees;
          if (!_.isArray(routeAssignees)) {
            routeAssignees = [routeAssignees];
          }

          var assignees = [];
          var index, assigneeId, subIndex, user;
          for (index = 0; index < routeAssignees.length; index++) {
            assigneeId = routeAssignees[index];

            for (subIndex = 0; subIndex < $scope.users.length; subIndex++) {
              user = $scope.users[subIndex];
              if (user.id == assigneeId) {
                assignees.push(user);
                break;
              }
            }
          }

          $scope.filters.assignees = assignees;
        }
      }

      // get project details
      ProjectsService.getById(
        $scope.projectId
      ).then(function (project) {
        $scope.project = project;
      });

      // get board details
      BoardsService.getById(
        $scope.boardId
      ).then(function (board) {
        $scope.board = board;
      });

      $scope.filter = function (sprints, assignees) {

        if (!sprints) {
          sprints = $scope.filters.sprints;
        }

        if (!assignees) {
          assignees = $scope.filters.assignees;
        }

        var selectedSprints = [];

        if (_.isArray(sprints)) {
          var index, sprint;
          for (index = 0; index < sprints.length; index++) {
            sprint = sprints[index];
            selectedSprints.push(sprint.id);
          }
        }

        var selectedAssignees = [];

        if (_.isArray(assignees)) {
          var index, assignee;
          for (index = 0; index < assignees.length; index++) {
            assignee = assignees[index];
            selectedAssignees.push(assignee.id);
          }
        }

        // adding lanes to view and tickets to lane
        var index, subIndex, ticket, lane, filteredOut;
        for (index = 0; index < $scope.lanes.length; index++) {

          lane = $scope.lanes[index];
          lane.tickets = [];
          lane.storyPoints = 0;

          for (subIndex = 0; subIndex < $scope.tickets.length; subIndex++) {
            ticket = $scope.tickets[subIndex];

            if (ticket.laneId === lane.id) {

              lane.tickets.push(ticket);
              lane.storyPoints += ticket.storyPoints;

              filteredOut = false;

              // if both filters are defined
              if (_.isArray(selectedSprints) && !_.isEmpty(selectedSprints)) {
                if (!_.contains(selectedSprints, ticket.sprintId)) {
                  lane.storyPoints -= ticket.storyPoints;
                  lane.tickets.pop();
                  filteredOut = true;
                }
              }

              if (!filteredOut && _.isArray(selectedAssignees) && !_.isEmpty(selectedAssignees)) {
                if (!_.contains(selectedAssignees, ticket.assigneeId)) {
                  lane.storyPoints -= ticket.storyPoints;
                  lane.tickets.pop();
                  filteredOut = true;
                }
              }
            }
          }
        }

        // Adding users to tickets

        var user;
        for (index = 0; index < $scope.tickets.length; index++) {

          ticket = $scope.tickets[index];

          for (subIndex = 0; subIndex < $scope.users.length; subIndex++) {
            user = $scope.users[subIndex];
            if (ticket.assigneeId === user.id) {
              ticket.assignee = user;
            }
          }
        }
      };

      // get all lanes of board
      LanesService.getByBoardId(
        $scope.boardId
      ).then(function (lanes) {
          $scope.lanes = lanes;
          return TicketLinksService.getByBoardId($scope.boardId);
        })
        .then(function (ticketLinks) {

          $scope.tickets = ticketLinks;

          var userIds = [];
          var index, ticket;
          for (index = 0; index < $scope.tickets.length; index++) {
            ticket = $scope.tickets[index];
            userIds.push(ticket.assigneeId);
          }

          if (userIds.length == 0) {
            // empty promise
            return $q(function() {
              return [];
            });
          }

          return UsersService.get({
            conditions : {
              id : _.uniq(userIds),
              roleId : 3, // users
            },
            fields : ["id", "username", "firstName", "lastName", "email", "avatar"]
          });
        })
        .then(function (users) {
          $scope.users = [];
          if (_.isArray(users) && users.length > 0) {
            $scope.users = users;
          }
        })
        .then(function () {

          var sprintIds = [];
          var index, ticket;
          for (index = 0; index < $scope.tickets.length; index++) {
            ticket = $scope.tickets[index];
            if (ticket.sprintId) {
              sprintIds.push(ticket.sprintId);
            }
          }

          if (sprintIds.length == 0) {
            return;
          }

          // get board's sprints
          return SprintsService.get({
              "conditions" : {
                "id" : _.uniq(sprintIds)
              }
            })
            .then(function (sprints) {
              $scope.sprints = sprints;
            });
        })
        .then($scope.parseRouteParams)
        .then($scope.filter);

      /**
       * Method used when drag n drop event finished
       * and ticket's details needs to be updated
       */
      $scope.updateTicket = function (item, source, target) {
        TicketLinksService.update(item.linkId, {laneId : target.lane.id})
          .then(function () {

            $scope.showSuccessAlert(
              '.content .alert',
              '<b>OK</b> Ticket updated sucessfully'
            );

            // updating item in scope
            item.laneId = target.lane.id;

            if (_.isNumber(item.storyPoints)) {
              source.lane.storyPoints -= item.storyPoints;
              target.lane.storyPoints += item.storyPoints;
            }
          });
      };

      // ---------------------------------------------
      // ---------- MODAL RELEATED FUNCTIONS ---------
      // ---------------------------------------------

      $scope.showCreateSprintModal = function (modalSelector) {

        var modalInstance = $modal.open({
          templateUrl: 'views/sprints/create.html',
          controller: 'SprintModalController',
          backdrop: 'static',
          resolve: {
            sprint : function () {
              return {
                status : 'active',
                boardId : $scope.boardId
              };
            },
            projectId : function () {
              return $scope.projectId;
            }
          }
        });

        modalInstance.result.then(function (records) {

          $scope.showSuccessAlert(
            '.content .alert',
            '<b>Sucess</b> Sprint was created sucessfully'
          );

        }, function () {
          //console.log('modal closed');
        });
      };

      $scope.showCreateTicketModal = function () {

        var modalInstance = $modal.open({
          templateUrl: 'views/tickets/create.html',
          controller: 'TicketModalController',
          backdrop: 'static',
          resolve: {
            ticket : function () {
              return {
                creatorId : $scope.identity.id,
                statusId : 1, // temp hack
                laneId : $scope.lanes[0].id,
                assigneeId : 1
              }
            },
            projectId : function () {
              return $scope.projectId
            },
            boardId : function () {
              return $scope.boardId
            },
            laneId : function () {
              return $scope.lanes[0].id
            }
          }
        });

        modalInstance.result.then(function (records) {
          var ticket     = records[0];
          var ticketLink = records[1];

          $scope.showSuccessAlert(
            '.content .alert',
            '<b>Sucess</b> Ticket was created sucessfully'
          );

          // if ticket has been added to sprint and it's
          // not on of filtered ones - don't add it
          if (ticketLink.sprintId) {
            if ($scope.filters.sprints.length > 0 &&
              !_.contains(ticketLink.sprintId, $scope.filters.sprints)
            ) {
              return;
            }
          }

          // if ticket was added to specific lane - use this one
          var targetLane = $scope.lanes[0];
          if (ticketLink.laneId) {
            var index, lane;
            for (index = 0; index < $scope.lanes.length; index++) {
              lane = $scope.lanes[index];
              if (lane.id == ticketLink.laneId) {
                targetLane = lane;
                break;
              }
            }
          }

          targetLane.tickets.push(ticket);

          // this check to be deleted
          var pattern = /^\d+$/;
          if (pattern.test(ticket.storyPoints)) {
            targetLane.storyPoints += parseInt(ticket.storyPoints);
          }
        }, function () {
          //console.log('modal closed');
        });
      }
    }
  ]
);
