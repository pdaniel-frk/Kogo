
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var dashboardController = angular.module(
  'DashboardController',
  [
    'TicketActivitiesService'
  ]
);

dashboardController.controller(
  'DashboardController',
  [
    '$scope', 'TicketActivitiesService',
    function ($scope, TicketActivitiesService) {

      TicketActivitiesService.getActivityFeed()
        .then(function (activities) {
          $scope.ticketActivities = activities;
        });
    }
  ]
);
