
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var ticketActivitiesService = angular.module(
  'TicketActivitiesService',
  []
);

ticketActivitiesService.factory(
  'TicketActivitiesService',
  [
    '$http',
    function ($http) {

      var ticketActivitiesApiUrl = '/api/ticket-activities';
      var ticketActivitiesUrl    = '/ticket-activities';

      return {
        // call to get all ticket activities
        getActivityFeed : function () {

          // formatting data
          return $http.get(ticketActivitiesUrl)
            .then(function (response) {
              return response.data;
            });
        },
      };
    }
  ]
);
