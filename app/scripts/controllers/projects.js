'use strict';

hoursApp
  .controller('ProjectsCtrl', function ($scope, db) {
    $scope.customers = db.Customer.query();
    
    $scope.create = function() {
      var newCustomer = new CustomerDb({name: $scope.newCustomerName});
      newCustomer.$save(function() {
        // Add to controller array(no need to refetch from server)
        $scope.customers.push(newCustomer);
      });
      $scope.newCustomerName = '';
    };
    $scope.delete = function(customer) {      
      customer.$delete(function() {
        // Remove from controller array
        var ix = $scope.customers.indexOf(customer);
        $scope.customers.splice(ix, 1);
      });
    };
  });
