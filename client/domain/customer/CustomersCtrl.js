'use strict';

window.app.controller('CustomersCtrl', function($scope, db, notifications, $modal, socket) {
    var loadCustomers = function() {
        $scope.customers = db.Customer.query();
    };
    loadCustomers();
    // UI events
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
        db.Customer.save($scope.customerBeingEdited);
        dismiss();
    };

    $scope.delete = function(customer) {
        customer.$delete();
    };

    // Server-side events:
    socket.on('customerAdded', function(customer) {
        loadCustomers();
        notifications.alert('Somebody added customer ' + customer.name + '.');
        console.log(customer);
    });
    socket.on('customerChanged', function(customer) {
        loadCustomers();
        notifications.alert('Somebody changed customer ' + customer.name + '.');
        console.log(customer);
    });
    socket.on('customerDeleted', function(customer) {
        loadCustomers();
        notifications.alert('Somebody deleted customer ' + customer.name + '.');
        console.log(customer);
    });
});
