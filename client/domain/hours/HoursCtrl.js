'use strict';
(function(moment) {
    window.app.controller('HoursCtrl', function($scope, db, hoursService) {
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
                    date: d.format('DD.MM'),
                    dateWithYear: d.format('YYYY.MM.DD'),
                    fullDate: moment(d).toDate()
                });
            }
            $scope.hours = hoursService.getHours($scope.days[0].dateWithYear, $scope.days[6].dateWithYear);
        };

        $scope.addProject = function(project) {
            $scope.hours.billedProjects.push({
                projectId: project._id,
                hours: []
            });
        };

        // start with today:
        $scope.setupScope(moment());

        $scope.nextWeek = function() {
            $scope.setupScope(moment().year($scope.year).week($scope.weeknumber + 1).day(0));
        };
        $scope.prevWeek = function() {
            $scope.setupScope(moment().year($scope.year).week($scope.weeknumber - 1).day(6));
        };

        $scope.save = function() {
            hoursService.saveHours($scope.days, $scope.hours);
        };
    });
})(window.moment);