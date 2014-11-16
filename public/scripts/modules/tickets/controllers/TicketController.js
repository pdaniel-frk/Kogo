
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var ticketsController = angular.module(
  'TicketController',
  [
    'TicketsService',
    'TicketLinksService',
    'CommentsService'
  ]
);

ticketsController.controller(
  'TicketController',
  [
    '$scope', '$routeParams', '$location', '$compile', '$modal',
    'TicketsService', 'TicketLinksService', 'CommentsService',
    function (
      $scope, $routeParams, $location, $compile, $modal,
      TicketsService, TicketLinksService, CommentsService
    ) {

      $scope.ticketId = $routeParams.ticketId.split('-').pop();

      if (parseInt($scope.ticketId) != $scope.ticketId) {
        $location.path('/');
      }

      TicketsService.getById(
        $scope.ticketId,
        {
          fields: {
            0 : "t.name",
            1 : "t.storyPoints",
            2 : "t.description",
            3 : 't.creatorId',
            4 : 't.assigneeId',
            5 : 't.statusId',
            6 : 't.id',
            "uc.username" : "creator",
            "uc.avatar" : "creatorAvatar",
            "ua.username" : "assignee",
            "ua.avatar" : "assigneeAvatar",
            "ts.name" : "status"
          },
          joins: ["creator", "assignee", "ticketStatus"]
        })
        .then(function (ticket) {
          $scope.ticket = ticket;
        });

      TicketLinksService.get(
        {
          conditions : {
            "ticketId": $scope.ticketId
          },
          joins : ["project", "board", "sprint", "lane"],
          fields : {
            0 : "tl.projectId",
            1 : "tl.boardId",
            2 : "tl.sprintId",
            "p.name" : "projectName",
            "p.code" : "projectCode",
            "b.name" : "boardName",
            "s.name" : "sprintName",
            "l.name" : "laneName"
          }
        }).then(function (ticketLinks) {
          $scope.ticketLinks = ticketLinks;
        });

      CommentsService.get({
        conditions: {
          "ticketId": $scope.ticketId
        },
        joins : ["user"],
        fields : {
          0 : "c.userId",
          1 : "c.text",
          2 : "c.createdAt",
          "u.avatar" : "userAvatar",
          "u.username" : "user"
        }
      }).then(function (comments) {
        $scope.comments = comments;
      });

      $scope.save = function (ticket) {
        TicketsService.update($scope.ticketId, ticket);
      }

      $scope.saveComment = function (comment) {
        comment = _.extend(comment, {
          userId : $scope.identity.id,
          ticketId : $scope.ticketId,
          status : 'active'
        });

        CommentsService.save(comment)
          .then(function (comment) {
            comment.userAvatar = $scope.identity.avatar;
            comment.user = $scope.identity.username;
            $scope.comments.push(comment);
            $scope.comment = {};
          });
      }

      $scope.activateEditor = function () {
        $('.ta-toolbar').show();
      };

      $scope.deactivateEditor = function (ticket) {
        $('.ta-toolbar').hide();
        $scope.save(ticket);
      };

      // ---------------------------------------------
      // ---------- MODAL RELEATED FUNCTIONS ---------
      // ---------------------------------------------

      $scope.showEditTicketModal = function (modalSelector) {

        var modalInstance = $modal.open({
          templateUrl: 'views/tickets/edit.html',
          controller: 'TicketModalController',
          backdrop: 'static',
          resolve: {
            ticket : function () {
              return $scope.ticket
            },
            projectId : function () {
              return $scope.projectId;
            },
            boardId : null,
            laneId : null
          }
        });

        modalInstance.result.then(function (ticket) {

          // update ticket in local scope
          console.log('Inside ticket controller', ticket);
          $scope.ticket = ticket;

          $scope.showSuccessAlert(
            '.content .alert',
            '<b>Sucess</b> Ticket was created sucessfully'
          );

        }, function () {
          console.log('modal closed');
        });
      };
    }
  ]
);
