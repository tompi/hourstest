
hoursApp.factory('db', function($resource) {
  var me = {};
  me.Customer = $resource('/api/customers/:id', { id: '@_id' }); 
  me.Project = $resource('/api/projects/:id', { id: '@_id' }); 
  return me;
});