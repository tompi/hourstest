/*global describe,it,expect*/
var resolver = require('../client/domain/hours/HoursResolver');
var _ = require("underscore");
var dbHours = [{"projectId":"51865c2b5cec0ba74d000003","userId":"3686e23360eaa1e015123456","date":"2013-05-13T06:50:07.497Z","hours":1,"_id":"518f3bb44c9665e02900000c","__v":0,"created":"2013-05-12T06:50:28.731Z"},{"projectId":"5186a23360cfe81015000001","userId":"3686e23360eaa1e015123456","date":"2013-05-13T06:50:07.497Z","hours":7,"_id":"518f3bb44c9665e02900000d","__v":0,"created":"2013-05-12T06:50:28.748Z"},{"projectId":"5186a23360cfe81015000001","userId":"3686e23360eaa1e015123456","date":"2013-05-15T06:50:07.497Z","hours":5,"_id":"518f3bb44c9665e02900000e","__v":0,"created":"2013-05-12T06:50:28.865Z"},{"projectId":"51865c2b5cec0ba74d000003","userId":"3686e23360eaa1e015123456","date":"2013-05-15T06:50:07.497Z","hours":3,"_id":"518f3bb44c9665e02900000f","__v":0,"created":"2013-05-12T06:50:28.867Z"},{"projectId":"51865c2b5cec0ba74d000003","userId":"3686e23360eaa1e015123456","date":"2013-05-17T06:50:07.497Z","hours":6,"_id":"518f3bb44c9665e029000010","__v":0,"created":"2013-05-12T06:50:28.923Z"},{"projectId":"5186a23360cfe81015000001","userId":"3686e23360eaa1e015123456","date":"2013-05-17T06:50:07.497Z","hours":2,"_id":"518f3bb44c9665e029000011","__v":0,"created":"2013-05-12T06:50:28.928Z"},{"projectId":"5186a23360cfe81015000001","userId":"3686e23360eaa1e015123456","date":"2013-05-14T06:50:07.497Z","hours":8,"_id":"518f3bb44c9665e029000012","__v":0,"created":"2013-05-12T06:50:28.929Z"}];

describe('HoursResolver.getUiHoursFromDbHours', function() {        
    var uiHours = resolver.getUiHoursFromDbHours(dbHours);
    it('should return 2 projects', function() {
        expect(uiHours.length).toEqual(2);
    });
    it('should find 8 hours on monday', function() {
        var mondayHours = 0;
        _.each(uiHours, function(project) {mondayHours += (project.hours[0] || 0);});
        expect(mondayHours).toEqual(8);
    });    
    it('should find 32 hours for the whole week', function() {
        var hours = 0;
        _.each(uiHours, function(project) {
            _.each(project.hours, function(hour) {
                hours += (hour || 0);
            });
        });
        expect(hours).toEqual(32);
    });    
});
describe('HoursResolver.getUiDiffs', function() {
    // Get ui-model
    var uiHours = resolver.getUiHoursFromDbHours(dbHours);
    // Alter ui-model
    // Deletes:
    uiHours[0].hours[0] = 0;
    uiHours[1].hours[4] = 0;
    // Changes:
    uiHours[1].hours[1] = 7;
    // New:    
    uiHours[0].hours[1] = 3.5;
    uiHours.push({ projectId: '1234562b5cec0ba74d123456', hours: [4, 5] });
    // Get calculated diff
    var diff = resolver.getUiDiffs(dbHours, uiHours);
    it('should return 2 deletes', function() {
        expect(diff.deleteds.length).toEqual(2);
    });
    it('should return 1 change', function() {
        expect(diff.changes.length).toEqual(1);
    });
    it('should return 3 new', function() {
        expect(diff.news.length).toEqual(3);
    });
});