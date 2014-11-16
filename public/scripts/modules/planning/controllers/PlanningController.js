
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var planningController = angular.module(
  'PlanningController',
  [
    'TicketsService',
    'ProjectsService',
    'BoardsService',
    'TicketLinksService',
    'UsersService',
    'LanesService',
    'SprintsService'
  ]
);

planningController.controller(
  'PlanningController',
  [
    '$scope', 'TicketsService', 'ProjectsService', 'BoardsService',
    'TicketLinksService', 'UsersService', 'LanesService', 'SprintsService',
    function ($scope, TicketsService, ProjectsService, BoardsService,
      TicketLinksService, UsersService, LanesService, SprintsService
    ) {

      ProjectsService.get()
        .then(function (projects) {
          $scope.projects = projects;
        });

      BoardsService.get()
        .then(function (boards) {
          $scope.boards = boards;
          $scope.boardOptions = [
            {
              id : '',
              name : 'Please select project'
            }
          ]
        });

      SprintsService.get()
        .then(function (sprints) {
          $scope.sprints = sprints;
          $scope.sprintOptions = [
            {
              id : '',
              name : 'Please select board'
            }
          ]
        });

      $scope.limitSourceBoards = function (projectId) {

        $scope.sourceBoardOptions = [];

        var index, board;
        for (index = 0; index < $scope.boards.length; index++) {
          board = $scope.boards[index];

          if (board.projectId == projectId) {
            $scope.sourceBoardOptions.push(board);
          }
        }
      };

      $scope.limitSourceSprints = function (boardId) {

        $scope.sourceSprintOptions = [];

        var index, sprint;
        for (index = 0; index < $scope.sprints.length; index++) {
          sprint = $scope.sprints[index];

          if (sprint.boardId == boardId) {
            $scope.sourceSprintOptions.push(sprint);
          }
        }
      };

      $scope.limitTargetBoards = function (projectId) {

        $scope.targetBoardOptions = [];

        var index, board;
        for (index = 0; index < $scope.boards.length; index++) {
          board = $scope.boards[index];

          if (board.projectId == projectId) {
            $scope.targetBoardOptions.push(board);
          }
        }
      };

      $scope.limitTargetSprints = function (boardId) {

        $scope.targetSprintOptions = [];

        var index, sprint;
        for (index = 0; index < $scope.sprints.length; index++) {
          sprint = $scope.sprints[index];

          if (sprint.boardId == boardId) {
            $scope.targetSprintOptions.push(sprint);
          }
        }
      };

      $scope.filter = function (
        sourceProjectId, sourceBoardId, sourceSprintId,
        targetProjectId, targetBoardId, targetSprintId
      ) {
        $scope.filterSource(sourceProjectId, sourceBoardId, sourceSprintId);
        $scope.filterTarget(targetProjectId, targetBoardId, targetSprintId);
      }

      $scope.filterSource = function (projectId, boardId, sprintId) {

        if (!boardId) {
          $scope.showDangerAlert(
            '.content .alert',
            '<b>Sorry</b> You need to choose 2 projects/boards (and optionally sprints)'
          );
          return;
        }

        var conditions = {
          boardId : boardId
        };

        conditions.sprintId = null;

        if (sprintId) {
          conditions.sprintId = sprintId;
        }

        TicketLinksService.get({conditions : conditions})
          .then(function (ticketLinks) {

            $scope.sourceTicketLinks = ticketLinks;

            var ticketIds = [];
            var index;
            for (index = 0; index < ticketLinks.length; index++) {
              ticketIds.push(ticketLinks[index].ticketId);
            }

            if (ticketIds.length == 0) {
              return [];
            }

            return TicketsService.get(
              {
                conditions : {
                  id : _.uniq(ticketIds)
                },
                fields : ["id", "name", "storyPoints", "assigneeId"]
              });
          })
          .then(function (tickets) {

            $scope.sourceTickets = tickets;

            var userIds = [];
            var index, subIndex, ticketLink;
            for (index = 0; index < tickets.length; index++) {
              ticket = tickets[index];
              userIds.push(ticket.assigneeId);

              // assign ticket links
              for (subIndex = 0; subIndex < $scope.sourceTicketLinks.length; subIndex++) {
                ticketLink = $scope.sourceTicketLinks[subIndex];
                if (ticketLink.ticketId == ticket.id) {
                  ticket.link = ticketLink;
                }
              }
            }

            if (userIds.length == 0) {
              return [];
            }

            return UsersService.get({
              conditions : {
                id : _.uniq(userIds)
              },
              fields : ["id", "avatar"]
            });
          })
          .then(function (users) {

            var index, ticket, subIndex, user;
            for (index = 0; index < $scope.sourceTickets.length; index++) {
              ticket = $scope.sourceTickets[index];

              for (subIndex = 0; subIndex < users.length; subIndex++) {
                user = users[subIndex];

                if (ticket.assigneeId == user.id) {
                  ticket.assignee = user;
                }
              }
            }
          });
      };

      $scope.filterTarget = function (projectId, boardId, sprintId) {

        if (!boardId) {
          $scope.showDangerAlert(
            '.content .alert',
            '<b>Sorry</b> You need to choose 2 projects/boards (and optionally sprints)'
          );
          return;
        }

        var conditions = {
          boardId : boardId
        };

        if (sprintId) {
          conditions.sprintId = sprintId;
        }

        TicketLinksService.get({conditions : conditions})
          .then(function (ticketLinks) {

            $scope.targetTicketLinks = ticketLinks;

            var ticketIds = [-1];
            var index;
            for (index = 0; index < ticketLinks.length; index++) {
              ticketIds.push(ticketLinks[index].ticketId);
            }

            return TicketsService.get(
              {
                conditions : {
                  id : _.uniq(ticketIds)
                },
                fields : ["id", "name", "storyPoints", "assigneeId"]
              });
          })
          .then(function (tickets) {
            $scope.targetTickets = tickets;

            var userIds = [-1];
            var index, subIndex, ticket, ticketLink;
            for (index = 0; index < tickets.length; index++) {
              ticket = tickets[index];
              userIds.push(ticket.assigneeId);

              // assign ticket links
              for (subIndex = 0; subIndex < $scope.targetTicketLinks.length; subIndex++) {
                ticketLink = $scope.targetTicketLinks[subIndex];
                if (ticketLink.ticketId == ticket.id) {
                  ticket.link = ticketLink;
                }
              }
            }

            return UsersService.get({
              conditions : {
                id : _.uniq(userIds)
              },
              fields : ["id", "avatar"]
            });
          })
          .then(function (users) {

            var index, ticket, subIndex, user;
            for (index = 0; index < $scope.targetTickets.length; index++) {
              ticket = $scope.targetTickets[index];

              for (subIndex = 0; subIndex < users.length; subIndex++) {
                user = users[subIndex];

                if (ticket.assigneeId == user.id) {
                  ticket.assignee = user;
                }
              }
            }
          });
      };

      $scope.updateTicket = function (item, source, target) {

        LanesService.getByBoardId(source.targetBoardSelector)
          .then(function (lanes) {
            var lane = lanes.shift();

            var ticketLink = {
              projectId : source.targetProjectSelector,
              boardId : source.targetBoardSelector,
              laneId : lane.id,
              sprintId : null
            };

            if (source.targetSprintSelector) {
              ticketLink.sprintId = source.targetSprintSelector;
            }

            TicketLinksService.update(item.link.id, ticketLink)
              .then(function () {
                $scope.showSuccessAlert(
                  '.content .alert',
                  '<b>OK</b> Ticket updated sucessfully'
                );
              });
          });
      };
    }
  ]
);
