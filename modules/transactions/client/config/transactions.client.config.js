(function () {
  'use strict';

  angular
    .module('transactions')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Transactions',
      state: 'transactions',
      type: 'dropdown',
      roles: ['user', 'admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'transactions', {
      title: 'List Transactions',
      state: 'transactions.list',
      roles: ['user', 'admin']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'transactions', {
      title: 'Create Transaction',
      state: 'transactions.create',
      roles: ['user', 'admin']
    });
  }
})();
