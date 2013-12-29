'use strict';

/* App Module */

var app = angular.module('app', [
    'ngRoute',
    'appAnimations',
    'appDirectives',
    'appControllers',
    'appFilters',
    'appServices'
]);

app.value('appname', 'Dimoco shop');
app.constant('version', '0.1');

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'partials/login.html',
                    controller: 'LoginController'
                }).
                when('/about', {
                    templateUrl: 'partials/about.html',
                    controller: 'AboutController'
                }).
                when('/contact', {
                    templateUrl: 'partials/contact.html',
                    controller: 'ContactController'
                }).
                when('/stores', {
                    templateUrl: 'partials/store-list.html',
                    controller: 'StoreController'
                }).
                when('/stores/:storeid', {
                    templateUrl: 'partials/store-detail.html',
                    controller: 'StoreDetailsController'
                }).
                otherwise({
                    redirectTo: '/'
                });
    }]);

app.run(['$rootScope', 'appname', 'version',
    function($rootScope, appname, version) {
        $rootScope.appname = appname;
        $rootScope.version = version;
    }]);
