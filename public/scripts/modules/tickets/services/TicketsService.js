
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var ticketsService = angular.module('TicketsService', []);

ticketsService.factory('TicketsService', ['$http', function ($http) {

  var ticketsApiUrl = '/api/tickets';

  return {
    // call to get all boards
    get : function (params) {
      var result = $http.get(
        ticketsApiUrl + (params ? '?' + $.param(params) : '')
      );

      // formatting data
      return result.then(function (response) {
        return response.data;
      });
    },

    getById : function (id, params) {
      params = params || {};

      params = _.extend(
        {
          // no defaults at current moment
        },
        params
      );
      var query = _.extend(params, {'conditions': {'t.id': id}});

      return this.get(query)
        .then(function (tickets) {
          if (!_.isArray(tickets)) {
            return null;
          }

          return tickets.pop();
        });
    },

    save : function (ticket) {
      if (ticket.id) {
        return this.update(ticket.id, ticket);
      }

      return this.create(ticket);
    },

    // call to POST and create a new ticket
    create : function (ticket) {
      return $http.post(ticketsApiUrl, ticket)
        .then(function (result) {
          return result.data;
        });
    },

    update: function (id, ticket) {
      return $http.put(ticketsApiUrl + '/' + id, ticket)
        .then(function (result) {
          return result.data;
        });
    },
  };

}]);
