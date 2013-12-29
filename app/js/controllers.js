'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('LoginController', ['$scope', '$rootScope', '$location', '$log', 'userService', 'menuService', '$window',
    function($scope, $rootScope, $location, $log, userService, menuService, $window) {
        $scope.username = '';
        $scope.password = '';
        $rootScope.menuitems = menuService.loadlist();
        $scope.login = function() {
            if (userService.login($scope.username, $scope.password)) {
                $rootScope.cart = {};
                $rootScope.user = $scope.username;
                $scope.password = '';
                $location.path('/stores');
            } else {
                $scope.password = '';
                $window.alert("Bad credentials. Try again!");
            }
        };
        $rootScope.$on('logoutEvent', function() {
            $rootScope.user = '';
            $log.info('User logged out');
            $location.path('/');

        });
        $rootScope.$on('visitAccountEvent', function() {
            $log.info('Opening user account');
        });
    }]);

appControllers.controller('StoreController', ['$scope', '$rootScope', 'storeService',
    function($scope, $rootScope, storeService) {
        $scope.query = '';
        $scope.orderProp = '';
        $scope.stores = storeService.loadlist();
        $rootScope.stores = $scope.stores;
    }]);

appControllers.controller('StoreDetailsController', ['$scope', '$rootScope', '$routeParams',
    function($scope, $rootScope, $routeParams) {
        $scope.store = $rootScope.stores[$routeParams.storeid];
    }]);

appControllers.controller('AboutController', ['$scope', '$rootScope', '$routeParams',
    function($scope, $rootScope, $routeParams) {
        
    }]);

appControllers.controller('ContactController', ['$scope', '$rootScope', '$routeParams',
    function($scope, $rootScope, $routeParams) {
        
    }]);