'use strict';

window.app.controller('CustomersCtrl', function($scope, db, notifications, $modal, socket) {
    // Load from db
    var loadCustomers = function() {
        $scope.customers = db.Customer.query();
    };
    loadCustomers();
    // UI events
    $scope.editCustomer = function(customer) {
        $scope.customerBeingEdited = customer || {};
        $modal({
            template: 'domain/customer/customerEdit.html',
            show: true,
            backdrop: 'static',
            scope: $scope,
            persist: true
        });
    };

    $scope.save = function(dismiss) {
        db.Customer.save($scope.customerBeingEdited);
        dismiss();
    };

    $scope.delete = function(customer) {
        (new db.Customer(customer)).$delete();
    };

    // Server-side events:
    socket.on('customerChanged', function(changedCustomer) {
        var existing = window._.find($scope.customers, function(c) { return c._id === changedCustomer._id; });
        if (existing) {
            window.angular.extend(existing, changedCustomer);
        } else {
            $scope.customers.push(changedCustomer);
        }
        notifications.alert('Somebody added or changed customer ' + changedCustomer.name + '.');
    });
    socket.on('customerDeleted', function(deletedCustomer) {
        $scope.customers = window._.filter($scope.customers, function(c) { return c._id !== deletedCustomer._id; })
        notifications.alert('Somebody deleted customer ' + deletedCustomer.name + '.');
    });
});
