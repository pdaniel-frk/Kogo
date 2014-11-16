
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var projectsListController = angular.module(
  'ProjectsListController',
  [
    'ProjectsService',
    'TicketLinksService',
    'BoardsService'
  ]
);

projectsListController.controller(
  'ProjectsListController',
  [
    "$scope", "ProjectsService", "TicketLinksService", "BoardsService",
    function ($scope, ProjectsService, TicketLinksService, BoardsService)
    {

      // method gets all projects
      $scope.getProjects = function () {

        return ProjectsService.get(
            {
              conditions : {
                status: 'active'
              }
            }
          )
          .then(function (projects) {

            var index, project;
            for (index = 0; index < projects.length; index++) {
              project = projects[index];
              project.ticketsCounter = 0;
              project.boardsCounter = 0;
            }

            return projects;
          }, function (e) {
            console.log('Error occurred : ' + e);
          });
      };

      $scope.getTicketLinksIds = function (projects) {

        if (_.isArray(projects) && projects.length > 0) {
          return TicketLinksService.get(
              {
                fields: ["id", "projectId"]
              }
            )
            .then(function (ticketLinks) {
              var index, subIndex, project, ticketLink;
              for (index = 0; index < ticketLinks.length; index++) {
                ticketLink = ticketLinks[index];
                for (subIndex = 0; subIndex < projects.length; subIndex++) {
                  project = projects[subIndex];
                  if (project.id == ticketLink.projectId) {
                    project.ticketsCounter++;
                    break;
                  }
                }
              }
            }, function (e) {
              console.log('Error occurred : ' + e);
            });
        };
      }

      // method gets all boards and assign
      $scope.getBoardsIds = function (projects) {

        if (_.isArray(projects) && projects.length > 0) {
          return BoardsService.get(
              {
                fields: ["id", "projectId"],
                conditions : {
                  status: 'active'
                }
              }
            )
            .then(function (boards) {
              var index, subIndex, project, board;
              for (index = 0; index < boards.length; index++) {
                board = boards[index];
                for (subIndex = 0; subIndex < projects.length; subIndex++) {
                  project = $scope.projects[subIndex];
                  if (project.id == board.projectId) {
                    project.boardsCounter++;
                    break;
                  }
                }
              }

            });
        }
      }

      $scope.getProjects()
        .then(function (projects) {
          $scope.getTicketLinksIds(projects);
          $scope.getBoardsIds(projects);
          $scope.projects = projects;
        });
    }
  ]
);
