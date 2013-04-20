'use strict';

var hoursApp = angular.module('hours', ['ui', 'ngResource'])
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
      .otherwise({
        redirectTo: '/'
      });
  });
