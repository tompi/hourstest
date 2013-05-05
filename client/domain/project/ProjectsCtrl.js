'use strict';

window.app.controller('ProjectsCtrl', function($scope, db, notifications, $modal) {
  $scope.customers = db.Customer.query();
  $scope.projects = db.Project.query();

  $scope.editProject = function(project) {
    $scope.valid = true;
    $scope.projectBeingEdited = project || new db.Project({});
    $scope.selectedCustomer = _.find($scope.customers, function(customer) { return customer._id == $scope.projectBeingEdited.customerId; });
    $modal({
      template: 'domain/project/projectEdit.html',
      show: true,
      backdrop: 'static',
      scope: $scope
    });
  };
  
  $scope.validate = function(project) {
      var valid = true;
      if (!project.customerId) {
        $scope.validationMessage = "You must select a customer";
        valid = false;
      }
      $scope.valid = valid;
      return valid;
  };

  $scope.save = function(dismiss) {
    var project = $scope.projectBeingEdited;
    project.customerId = $scope.selectedCustomer ? $scope.selectedCustomer._id : '';
    if (!$scope.validate(project)) {
        return;
    }
    project.customerId = $scope.selectedCustomer._id;
    var newProject = !project._id;
    
    notifications.alert('Saving ' + project.name);
    project.$save(function() {
      if (newProject) {
        // Add to controller array(no need to refetch from server)
        $scope.projects.push(project);
      }
    });
    dismiss();
  };

  $scope.delete = function(project) {
    project.$delete(function() {
      // Remove from controller array
      var ix = $scope.projects.indexOf(project);
      $scope.projects.splice(ix, 1);
    });
  };
});
