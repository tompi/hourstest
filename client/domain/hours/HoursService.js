'use strict';

(function(_, HoursResolver) {
    var userId = '3686e23360eaa1e015123456';
    window.app.factory('hoursService', function(db) {
        var me = {};
        me.saveHours = function(days, hours) {
            var diffs = HoursResolver.getUiDiffs(hours.existingHours, hours.billedProjects);
            _.each(diffs.news.concat(diffs.changes), function(hourRegistration) {
                // Translate daynumber into date:
                hourRegistration.date = days[hourRegistration.day].fullDate;
                hourRegistration.userId = userId;
                delete hourRegistration.day;
                (new db.Hour(hourRegistration)).$save();
            });
            _.each(diffs.deleteds, function(hourRegistration) {
                (new db.Hour(hourRegistration)).$delete();
            });
        };
        me.getHours = function(fromDate, toDate) {
          var ret = {
              existingHours: db.HoursByUserId.get({userId: userId, fromDate: fromDate, toDate: toDate}, function() {
                 ret.existingHours = ret.existingHours.payload;
                 ret.billedProjects = HoursResolver.getUiHoursFromDbHours(ret.existingHours);
              })
          };
          return ret;
        };
        return me;
    });
})(window._, window.HoursResolver);