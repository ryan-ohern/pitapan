(function () {
  'use strict';

  // Departments controller
  angular
    .module('departments')
    .controller('DepartmentsController', DepartmentsController);

  DepartmentsController.$inject = ['$scope', '$state', 'Authentication', 'departmentResolve', '$resource', 'ProductsService', 'EmployeesService'];

  function DepartmentsController ($scope, $state, Authentication, department, $resource, ProductsService, EmployeesService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.department = department;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.products = ProductsService.query();
    vm.employees = EmployeesService.query();
    vm.role = Authentication.user.roles;
    vm.isAdmin = false;
    
    // Set isAdmin to TRUE or FALSE to show edit/delete buttons
    if (vm.role[0] === "admin" && vm.department.isCurrentUserOwner === false){
      vm.isAdmin = true;
    }

    // Remove existing Department
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.department.$remove($state.go('departments.list'));
      }
    }

    // Save Department
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.departmentForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.department._id) {
        vm.department.$update(successCallback, errorCallback);
      } else {
        vm.department.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('departments.view', {
          departmentId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
