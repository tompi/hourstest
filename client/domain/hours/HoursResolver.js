(function(exports, _, moment) {
  exports.getUiHoursFromDbHours = function(dbHours) {
    var projects = [];
    _.each(dbHours, function(dbHour) {
        // Find existing project line
        var projectWeeklyBillings = _.find(projects, function(p) { return p.projectId === dbHour.projectId; });
        // If none found, make a new and insert into array
        if (!projectWeeklyBillings) {
            projectWeeklyBillings = { projectId: dbHour.projectId, hours: [] };
            projects.push(projectWeeklyBillings);
        }
        // Find out which weekday this corresponds to
        var weekDay = moment(dbHour.date).day() - 1;
        // Sunday = 6, not 0...
        if (weekDay < 0) { weekDay = 6; }
        // put hours into array at day index
        projectWeeklyBillings.hours[weekDay] = ( projectWeeklyBillings.hours[weekDay] || 0 ) + dbHour.hours;
    });
    return projects;
  };
  
  exports.getUiDiffs = function(dbHours, uiHours) {
      // First index dbHours for easy lookup when comparing:
      var dbHoursProjects = {};
      _.each(dbHours, function(dbHourRegistration) {
        // Add project if not in hash
        if (!dbHoursProjects[dbHourRegistration.projectId]) { dbHoursProjects[dbHourRegistration.projectId] = {hours: [], ids: []}; }
        // Calculate day of week:
        var weekDay = moment(dbHourRegistration.date).day() - 1;
        // Sunday = 6, not 0...
        if (weekDay < 0) { weekDay = 6; }
        // Insert into array:
        dbHoursProjects[dbHourRegistration.projectId].hours[weekDay] = dbHourRegistration.hours;
        dbHoursProjects[dbHourRegistration.projectId].ids[weekDay] = dbHourRegistration._id;
      });
      var ret = { changes: [], news: [], deleteds: [] };
      // Now loop over ui-hours and compare
      _.each(uiHours, function(project) {
          var oldProject = dbHoursProjects[project.projectId] || {hours: [], ids: []};          
          for (var i=0; i<7; i++) {
            var oldHours = oldProject.hours[i] || 0;
            var newHours = project.hours[i] || 0;
            if (newHours > 0) {
                if (oldHours === 0) {
                    // new
                    ret.news.push({day: i, projectId: project.projectId, hours: project.hours[i]});
                } else {
                    if (oldHours !== newHours) {
                        // Changed
                        ret.changes.push({day: i, projectId: project.projectId, hours: project.hours[i], _id: oldProject.ids[i]});
                    }
                }
            } else {
                if (oldHours > 0) {
                    // Deleted
                    ret.deleteds.push({_id: oldProject.ids[i]});
                }
            }
          }
      });
      return ret;
  };
})(
    typeof exports !== 'undefined' ? exports : window.HoursResolver = {},
    typeof require === 'function' ? require('underscore') : window._,
    typeof require === 'function' ? require('moment') : window.moment
    );