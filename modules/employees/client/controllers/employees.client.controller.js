(function () {
  'use strict';

  // Employees controller
  angular
    .module('employees')
    .controller('EmployeesController', EmployeesController);

  EmployeesController.$inject = ['$scope', '$state', 'Authentication', 'employeeResolve', '$resource', 'DepartmentsService'];

  function EmployeesController ($scope, $state, Authentication, employee, $resource, DepartmentsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.employee = employee;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.departments = DepartmentsService.query();
    vm.role = Authentication.user.roles;
    vm.isAdmin = false;
    
    // Set isAdmin to TRUE or FALSE to show edit/delete buttons
    if (vm.role[0] === "admin" && vm.employee.isCurrentUserOwner === false){
      vm.isAdmin = true;
    }

    // Remove existing Employee
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.employee.$remove($state.go('employees.list'));
      }
    }

    // Save Employee
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.employeeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.employee._id) {
        vm.employee.$update(successCallback, errorCallback);
      } else {
        vm.employee.$save(successCallback, errorCallback);
      }

      // updateDepartmentEmployees();

      function successCallback(res) {
        $state.go('employees.view', {
          employeeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    function updateDepartmentEmployees() {
      // assign the selected dept from drop down to var department that will be updated
      var department = vm.employee.department;
      // re-assign product.department to just the department name - prevents circular loop
      vm.employee.department = vm.employee.department.name;
      // push product to department products array
      department.employees.push(vm.employee);

      if (department._id) {
        department.$update(successCallback, errorCallback);
      } else {
        department.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        console.log('you updated product inventory');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

  }
})();
