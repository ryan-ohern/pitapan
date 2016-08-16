(function () {
  'use strict';

  // Customers controller
  angular
    .module('customers')
    .controller('CustomersController', CustomersController);

  CustomersController.$inject = ['$scope', '$state', 'Authentication', 'customerResolve'];

  function CustomersController ($scope, $state, Authentication, customer) {
    var vm = this;

    vm.authentication = Authentication;
    vm.customer = customer;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.role = Authentication.user.roles;
    vm.isAdmin = false;
    
    // Set isAdmin to TRUE or FALSE to show edit/delete buttons
    if (vm.role[0] === "admin" && vm.customer.isCurrentUserOwner === false){
      vm.isAdmin = true;
    }

    // Remove existing Customer
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.customer.$remove($state.go('customers.list'));
      }
    }

    // Save Customer
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.customerForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.customer._id) {
        vm.customer.$update(successCallback, errorCallback);
      } else {
        vm.customer.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('customers.view', {
          customerId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
