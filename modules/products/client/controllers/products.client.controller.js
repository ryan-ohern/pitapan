(function () {
  'use strict';

  // Products controller
  angular
    .module('products')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['$scope', '$state', 'Authentication', 'productResolve', '$resource', 'DepartmentsService'];

  function ProductsController ($scope, $state, Authentication, product, $resource, DepartmentsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.product = product;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.departments = DepartmentsService.query();

    // Remove existing Product
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.product.$remove($state.go('products.list'));
      }
    }

    // Save Product
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.productForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.product._id) {
        vm.product.$update(successCallback, errorCallback);
      } else {
        vm.product.$save(successCallback, errorCallback);
      }

      updateDepartmentProducts();

      function successCallback(res) {
        $state.go('products.view', {
          productId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    function updateDepartmentProducts() {
      // assign the selected dept from drop down to var department that will be updated
      var department = vm.product.department;
      // re-assign product.department to just the department name - prevents circular loop
      vm.product.department = vm.product.department.name;
      // push product to department products array
      department.products.push(vm.product);

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
