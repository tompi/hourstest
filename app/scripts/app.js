'use strict';

window.app = angular.module('hours', ['ui', 'ngResource', '$strap.directives'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/Customers', {
        templateUrl: 'views/customers.html',
        controller: 'CustomersCtrl'
      })
      .when('/Projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
