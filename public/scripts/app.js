
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var app = angular.module(
  'kogoApp',
  [
    'ngRoute',
    'ngSanitize',
    'appRoutes',
    'btford.socket-io',
    'angularFileUpload',
    'textAngular',
    'ui.select',
    'Mac',

    'ui.bootstrap',

    'BoardsListController',
    'BoardController',
    'CommentsController',
    'ProjectsListController',
    'DashboardController',
    'LogoutController',
    'SprintModalController',
    'TicketController',
    'TicketModalController',
    'UserController',
    'PlanningController',

    'BoardsService',
    'CommentsService',
    'ProjectsService',
    'SprintsService',
    'TicketsService',
    'LanesService',
    'UsersService',
    'TicketActivitiesService',
    'TicketLinksService',
    'LogoutService'
  ]
);

app.run(["$rootScope", "UsersService", function ($rootScope, UsersService) {

  // init global user data
  if (!$rootScope.user) {
    UsersService.getInfo()
      .then(function (user) {
        $rootScope.identity = user;
      });
  }

  $rootScope.showModal = function (modalSelector) {
    modalSelector = modalSelector || '.modal';
    $(modalSelector).modal(
      {
        show : true,
        backdrop : 'static'
      }
    );
    $rootScope.currentModalSelector = modalSelector;
  };

  $rootScope.hideModal = function (modalSelector) {
    modalSelector = modalSelector || '.modal';
    $(modalSelector).modal('hide');
  };

  // method used to show any type of alert
  $rootScope.showAlert = function (alertType, alertSelector, message) {
    var alert = $(alertSelector);
    alert.removeClass().addClass('alert alert-' + alertType + ' alert-dismissable');
    alert.children('.message').html(message);
    alert.show();
  };

  // method used to show success alert
  $rootScope.showSuccessAlert = function (alertSelector, message) {
    $rootScope.showAlert('success', alertSelector, message);
  };

  // method used to show info alert
  $rootScope.showInfoAlert = function (alertSelector, message) {
    $rootScope.showAlert('info', alertSelector, message);
  };

  // method used to show warning alert
  $rootScope.showWarningAlert = function (alertSelector, message) {
    $rootScope.showAlert('warning', alertSelector, message);
  };

  // method used to show danger alert
  $rootScope.showDangerAlert = function (alertSelector, message) {
    $rootScope.showAlert('danger', alertSelector, message);
  };

  // method used to hide alert
  $rootScope.hideAlert = function (alertSelector) {
    var alert = $(alertSelector);
    alert.hide();
  };

  // setting up underscore
  $rootScope._ = window._;

  // setting up underscore
  $rootScope.Math = window.Math;
}]);

app.config(function(uiSelectConfig) {
  uiSelectConfig.theme = 'select2';
});

app.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});
