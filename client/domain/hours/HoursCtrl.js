'use strict';

window.app.controller('HoursCtrl', function($scope, db, notifications, $modal) {
    $scope.customers = db.Customer.query();
    $scope.projects = db.Project.query();
    

    $scope.setupScope = function(momentDay) {
        $scope.weeknumber = momentDay.week();
        $scope.year = momentDay.year();
        // Find all dates:
        $scope.days = [];
        for (var i = 1; i < 8; i++) {
            var d = momentDay.day(i);
            $scope.days.push({
                name: d.format('ddd'),
                date: d.format('DD.MM')
            });
        }
        // TODO: fill from rest
        $scope.billedProjects = [];
    };
    
    $scope.addProject = function(project) {
        $scope.billedProjects.push({project: project, hours: []});
    };

    // start with today:
    $scope.setupScope(moment());

    $scope.nextWeek = function() {
        $scope.setupScope(moment().year($scope.year).week($scope.weeknumber + 1).day(0));
    };
    $scope.prevWeek = function() {
        $scope.setupScope(moment().year($scope.year).week($scope.weeknumber - 1).day(6));
    };
});
