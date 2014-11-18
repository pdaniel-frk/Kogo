
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var appRoutes = angular.module('appRoutes', []);

appRoutes.config(
  [
    '$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

      $routeProvider

        // home page
        .when('/', {
          templateUrl: '/static/views/dashboard.html',
          controller: 'DashboardController'
        })

        .when('/logout', {
          templateUrl: '/static/views/dashboard.html',
          controller: 'LogoutController'
        })

        // list of all projects
        .when('/projects', {
          templateUrl: '/static/views/projects/list.html',
          controller: 'ProjectsListController'
        })

        // list of all boards of project
        .when('/projects/:projectId', {
          templateUrl: '/static/views/boards/list.html',
          controller: 'BoardsListController',
        })

        // board overview
        .when('/projects/:projectId/boards/:boardId', {
          templateUrl: '/static/views/boards/view.html',
          controller: 'BoardController'
        })

        // ticket details
        .when('/tickets/:ticketId', {
          templateUrl: '/static/views/tickets/view.html',
          controller: 'TicketController'
        })

        // user details
        .when('/users/:userId', {
          templateUrl: '/static/views/users/view.html',
          controller: 'UserController'
        })

        // planning details
        .when('/planning', {
          templateUrl: '/static/views/planning/view.html',
          controller: 'PlanningController'
        })

        .otherwise({
          templateUrl: '/static/views/404.html',
          controller: ''
        });

      $locationProvider.html5Mode(true);
    }
  ]
);
