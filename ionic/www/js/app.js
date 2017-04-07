// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var appCtrl = angular.module('starter.controller', []);

var appService = angular.module('starter.services', []);

var app = angular.module('starter', ['ionic', 'starter.controller', 'starter.services', 'angular-oauth2', 'ngResource', 'ngCordova'])

.constant('appConfig', {
  baseUrl:'http://localhost:8000'
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, OAuthProvider, OAuthTokenProvider, appConfig, $provide){
   
   OAuthTokenProvider.configure({
    name: 'token',
    options: {
      secure: false
    }
  });

   OAuthProvider.configure({
      baseUrl: appConfig.baseUrl,
      // colocar https qnd tiver em producao
      clientId: 'appid01',
      clientSecret: 'secret', // optional
      grantPath:'/oauth/access_token'
  });

  $stateProvider
  .state('menu',{
    url: '/menu',
    templateUrl:'templates/menu.html',
    controller: function($scope, $ionicSideMenuDelegate){
      $scope.openLeft = function(){
        $ionicSideMenuDelegate.toggleLeft()
      }
      $scope.openRight = function(){
        $ionicSideMenuDelegate.toggleRight()
      }
    }
  }).state('menu.a',{
    url: '/a',
    template:'<ion-view>'+
    '<ion-content class="has-header">'+
    '<h1>A</h1>'+
    '<a ui-sref="menu.b">B</a><br/>'+
    '<a ui-sref="menu.c">C</a>'+
    '</ion-content>'+
    '</ion-view>',
    controller: function($scope){

    }
  })
  .state('menu.b',{
    url: '/b',
    template:'<ion-view>'+
    '<ion-content class="has-header">'+
    '<h1>C</h1>'+
    '<a ui-sref="menu.a">A</a><br/>'+
    '<a ui-sref="menu.c">C</a>'+
    '</ion-content>'+
    '</ion-view>',
    controller: function($scope){
      
    }
  })
  .state('menu.c',{
    url: '/c',
    template:'<ion-view>'+
    '<ion-content class="has-header">'+
    '<h1>C</h1>'+
    '<a ui-sref="menu.b">B</a><br/>'+
    '<a ui-sref="menu.a">A</a>'+
    '</ion-content>'+
    '</ion-view>',
    controller: function($scope){
      
    }
  })
  .state('login',{
    url: '/login',
    templateUrl:'templates/login.html',
    controller:'LoginCtrl'
  })
  .state('home',{
    url: '/home',
    templateUrl:'templates/home.html',
    controller:'LoginCtrl'
  })
  .state('client',{
    abstract:true,
    url: '/client',
    template:'<ion-nav-view/>'
  })
  .state('client.checkout',{
    cache: false,
    url: '/checkout',
    templateUrl:'templates/client/checkout.html',
    controller:'ClientCheckoutCtrl'
  })
  .state('client.checkout_item_detail',{
    url: '/checkout/detail/:index',
    templateUrl:'templates/client/checkout_item_detail.html',
    controller:'ClientCheckoutDetailCtrl'
  })
  .state('client.checkout_successful',{
    cache:false,
    url:'/checkout/successful',
    templateUrl:'templates/client/checkout_successful.html',
    controller: 'ClientCheckoutSuccessfulCtrl'
  })
  .state('client.view_products',{
    url: '/view_products',
    templateUrl:'templates/client/view_products.html',
    controller:'ClientViewProductCtrl'
  })

  $urlRouterProvider.otherwise('/login');

  $provide.decorator('OAuthToken',['$localStorage', '$delegate' ,function($localStorage, $delegate){
    Object.defineProperties($delegate,{
      setToken:{
        value: function(data){
          return $localStorage.setObject('token', data);
        },
        enumerable: true,
        configurable: true,
        writable: true
      }, 
      getToken:{
        value: function(){
          return $localStorage.getObject('token');
        },
        enumerable: true,
        configurable: true,
        writable: true
      }, 
      removeToken:{
        value: function(){
           return $localStorage.setObject('token', null);
        },
        enumerable: true,
        configurable: true,
        writable: true
      }
    });
    return $delegate;
    // essa config sobrescreve o OAuthToken no provide
  }]);
})
.service('cart', function(){
  this.items = [];
});