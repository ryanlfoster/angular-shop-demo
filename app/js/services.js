'use strict';

/* Services */

var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('menuService', ['$resource',
    function($resource) {
        return $resource('data/menu.json', {}, {
            loadlist: {method:'GET', params:{}, isArray:false}
        });
    }]);

appServices.factory('userService', ['$http',
    function($http) {
        var users = {};
        $http.get('data/users.json').success(function(data) {
            users = data;
        });
        return {
            login: function(username, password) {
                var user = users[username];
                return user && user.password === password;
            }
        };
    }]);

appServices.factory('storeService', ['$resource',
    function($resource) {
        return $resource('data/stores.json', {}, {
            loadlist: {method:'GET', params:{}, isArray:false}
        });
    }]);
