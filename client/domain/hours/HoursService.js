'use strict';
(function(_) {
    window.app.factory('hoursService', function(db) {
        var me = {};
        me.saveHours = function(days, hours) {
            _.each(hours, function(projectLine) {
                for (var i = 0; i < 7; i++) {
                    if (projectLine.hours[i]) {
                        var hour = new db.Hour({
                            projectId: projectLine.project._id,
                            userId: "5186a23360cfe81015000001",
                            date: days[i].fullDate,
                            hours: projectLine.hours[i]
                        });
                        hour.$save();
                    }
                }                            
            });
        };
        me.getHours = function() {
          var ret = {
              existingHours: db.HoursByUserId.get({userId: "5186a23360cfe81015000001"}, function() {
                 ret.existingHours = ret.existingHours.payload;                 
              })
          };
          return ret;
        };
        return me;
    });
})(window._);