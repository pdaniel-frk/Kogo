
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var ticketLinksService = angular.module('TicketLinksService', []);

ticketLinksService.factory('TicketLinksService', ['$http', function ($http) {

  var ticketLinksApiUrl = '/api/ticket-links';

  return {
    // call to get all ticket links
    get : function (params) {
      var result = $http.get(
        ticketLinksApiUrl + (params ? '?' + $.param(params) : '')
      );

      // formatting data
      return result.then(function (response) {
        return response.data;
      });
    },

    getById : function (id, params) {
      params = params || {};

      var query = _.extend(params, {'conditions': {'id': id}});

      return this.get(query)
        .then(function (ticketLinks) {
          if (!_.isArray(ticketLinks)) {
            return null;
          }

          return ticketLinks.pop();
        });
    },

    save : function (ticketLink) {
      if (ticketLink.id) {
        return this.update(ticketLink.id, ticketLink);
      }

      return this.create(ticketLink);
    },

    // call to POST and create a new ticketLink
    create : function (ticketLink) {
      return $http.post(ticketLinksApiUrl, ticketLink)
        .then(function (result) {
          return result.data;
        });
    },

    update: function (id, ticketLink) {
      return $http.put(ticketLinksApiUrl + '/' + id, ticketLink)
        .then(function (result) {
          return result.data;
        });
    },

    getByBoardId : function (boardId) {
      return this.get({
        "conditions": {
          "tl.boardId" : boardId,
          "l.status" : "active"
        },
        "joins" : [
          "ticket",
          "lane"
        ],
        "fields" : {
          0 : "t.id",
          1 : "t.name",
          2 : "t.assigneeId",
          3 : "t.creatorId",
          4 : "t.storyPoints",
          5 : "tl.laneId",
          6 : "tl.sprintId",
          "tl.id" : "linkId"
        }
      });
    }
  };

}]);
