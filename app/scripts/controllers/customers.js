'use strict';

hoursApp.controller('CustomersCtrl', function($scope, db, $modal) {

  $scope.customers = db.Customer.query();

  $scope.editCustomer = function(customer) {

    $scope.customerBeingEdited = customer || new db.Customer({});

    $modal({
      template: 'views/customerEdit.html',
      show: true,
      backdrop: 'static',
      scope: $scope
    });
  };

  $scope.save = function(dismiss) {
    var newCustomer = ! $scope.customerBeingEdited._id;
    $scope.customerBeingEdited.$save(function() {
      if (newCustomer) {
        // Add to controller array(no need to refetch from server)
        $scope.customers.push($scope.customerBeingEdited);
      }
    });
    dismiss();
  };

  $scope.delete = function(customer) {
    customer.$delete(function() {
      // Remove from controller array
      var ix = $scope.customers.indexOf(customer);
      $scope.customers.splice(ix, 1);
    });
  };
});
