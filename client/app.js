'use strict';

window.app = window.angular.module('hours', ['ui', 'ngResource', '$strap.directives']).config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'domain/hours/hours.html',
        controller: 'HoursCtrl'
    }).when('/Customers', {
        templateUrl: 'domain/customer/customers.html',
        controller: 'CustomersCtrl'
    }).when('/Projects', {
        templateUrl: 'domain/project/projects.html',
        controller: 'ProjectsCtrl'
    }).otherwise({
        redirectTo: '/'
    });
});

window.app.filter('customerFormatter', function() {
    return function(customerId, customers) {
        var customer = _.find(customers, function(customer) {
            return customer._id == customerId;
        });
        return !customer ? '' : customer.name;
    };
});
window.app.filter('customerLogoUrlFormatter', function() {
    return function(customerId, customers) {
        var customer = _.find(customers, function(customer) {
            return customer._id == customerId;
        });
        return !customer ? '' : customer.logoUrl;
    };
});
