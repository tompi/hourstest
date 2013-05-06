window.app.factory('db', function($resource) {
  var me = {};
  me.Customer = $resource('/api/customers/:id', {
    id: '@_id'
  });
  me.Project = $resource('/api/projects/:id', {
    id: '@_id'
  });
  me.Hour = $resource('/api/hours/:id', {
    id: '@_id'
  });
  me.HoursByUserId = $resource('/mersapi/hour/finder/findByUser/:userId', {
    userId: '@userId'
  });
  return me;
});