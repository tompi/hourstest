'use strict';

window.app.controller('CustomersCtrl', function($scope, db, notifications, $modal, socket) {
  $scope.customers = db.Customer.query();

  $scope.editCustomer = function(customer) {

    $scope.customerBeingEdited = customer || new db.Customer({});

    $modal({
      template: 'domain/customer/customerEdit.html',
      show: true,
      backdrop: 'static',
      scope: $scope
    });
  };

  $scope.save = function(dismiss) {
    var newCustomer = !$scope.customerBeingEdited._id;
    notifications.alert('Saving ' + $scope.customerBeingEdited.name);
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

  // Events:
  socket.on('customerAdded', function(data) {
    notifications.alert('Somebody else added a customer.');
    console.log(data);
  });
});
