'use strict';
(function(_) {
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
    var getEntity = function(entityId, entityList) {
        return _.find(entityList, function(entity) {
                return entity._id === entityId;
            }) || {};
    };
    window.app.filter('customerFormatter', function() {
        return function(customerId, customers) {
            return getEntity(customerId, customers).name;
        };
    });
    window.app.filter('customerLogoUrlFormatter', function() {
        return function(projectId, customers, projects) {
            var project = getEntity(projectId, projects);
            var customer = getEntity(project.customerId, customers);
            return customer.logoUrl;
        };
    });
    window.app.filter('projectNameFormatter', function() {
        return function(projectId, projects) {
            return getEntity(projectId, projects).name;
        };
    });
})(window._);