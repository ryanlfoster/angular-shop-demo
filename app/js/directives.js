'use strict';

/* Directives */

var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('menu', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope, $rootScope) {
            $scope.menuitems = $rootScope.menuitems;
        },
        templateUrl: 'partials/components/menu.html',
        replace: true
    };
});

appDirectives.directive('userpane', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope, $rootScope) {
            $scope.username = $rootScope.user;
            $scope.logout = function() {
                $rootScope.$broadcast('logoutEvent');
            };
            $scope.account = function() {
                $rootScope.$broadcast('visitAccountEvent');
            };
        },
        templateUrl: 'partials/components/userpane.html',
        replace: true
    };
});

appDirectives.directive('languagebar', function() {
    return {
        restrict: 'E',
        scope: {},
        controller: function($scope, $locale, $location, $log) {
            $scope.languages = [
                {code: 'en-us', name: 'English'},
                {code: 'fr-fr', name: 'French'},
                {code: 'de-de', name: 'German'},
                {code: 'sr-sr', name: 'Serbian'}
            ];
            $scope.language = $scope.languages[0];
            $scope.changelocale = function() {
                $locale.id = $scope.language.code;
                $log.info('Locale changed to: ' + $locale.id);
                $location.path('/');
            };
        },
        templateUrl: 'partials/components/langselect.html',
        replace: true
    };
});

appDirectives.directive('languagebarmenu', function() {
    return {
        restrict: 'E',
        scope: {},
        controller: function($scope, $locale, $location, $log) {
            $scope.languages = [
                {code: 'en-us', name: 'English'},
                {code: 'fr-fr', name: 'French'},
                {code: 'de-de', name: 'German'},
                {code: 'sr-sr', name: 'Serbian'}
            ];
            $scope.language = $scope.languages[0];
            $scope.changelocale = function() {
                $locale.id = $scope.language.code;
                $log.info('Locale changed to: ' + $locale.id);
                $location.path('/');
            };
        },
        templateUrl: 'partials/components/langselect_menu.html',
        replace: true
    };
});

appDirectives.directive('cart', function() {
    return {
        restrict: 'E',
        scope: {},
        controller: function($scope, $rootScope, $window) {
            $scope.incart = [];
            $scope.incartsize = function() {
                return $scope.incart.length;
            };
            $scope.hasitems = function() {
                return $scope.incartsize() > 0;
            };
            $scope.incartvalue = function() {
                var sum = 0;
                for (var i=0; i < $scope.incart.length; i++) {
                    var pr = $scope.incart[i];
                    var prPrice = parseFloat(pr.price);
                    var prQuant = parseInt(pr.quantity);
                    sum = sum + prPrice * prQuant;
                }
                return sum;
            };
            $rootScope.getProductIndex = function(product) {
                for(var i=0; i < $scope.incart.length; i++) {
                   if($scope.incart[i].name === product.name) {
                       return i;
                   }
                }
                return -1;
            };
            $scope.removeCartItem = function(index) {
                if($scope.incart[index].quantity > 1) {
                    $scope.incart[index].quantity -= 1;
                } else {
                    $scope.incart.splice(index, 1);
                }
            };
            $scope.emptyCart = function() {
                $scope.incart = [];
            };
            $scope.checkoutCart = function() {
                $window.alert("Checkout cart!");
            };
            $rootScope.addToCart = function(product) {
                var index = $rootScope.getProductIndex(product);
                if(index >= 0) {
                    $scope.incart[index].quantity += 1;
                } else {
                    product.quantity = 1;
                    $scope.incart.push(product);
                }
            };
        },
        templateUrl: 'partials/components/cart.html',
        replace: true
    };
});

appDirectives.directive('search', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            searchtitle: '=searchtitle'
        },
        controller: function($scope, $rootScope) {
            $scope.searchstring = $rootScope.searchstring;
        },
        templateUrl: 'partials/components/search.html',
        replace: true
    };
});

app.directive('focusOn', function() {
   return function(scope, elem, attr) {
      scope.$on('focusOn', function(e, name) {
        if(name === attr.focusOn) {
          elem[0].focus();
        }
      });
   };
});

app.factory('focus', function ($rootScope, $timeout) {
  return function(name) {
    $timeout(function (){
      $rootScope.$broadcast('focusOn', name);
    });
  };
});