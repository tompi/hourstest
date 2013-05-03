'use strict';

window.app = angular.module('hours', ['ui', 'ngResource', '$strap.directives'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main.html',
        controller: 'MainCtrl'
      })
      .when('/Customers', {
        templateUrl: 'domain/customer/customers.html',
        controller: 'CustomersCtrl'
      })
      .when('/Projects', {
        templateUrl: 'domain/project/projects.html',
        controller: 'ProjectsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
