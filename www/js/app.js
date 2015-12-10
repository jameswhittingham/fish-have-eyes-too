// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $localstorage, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
      $cordovaStatusbar.hide();
    }
  });

  $rootScope.clearData = function() {
    $rootScope.colorData = {
      total: 24,
      itemsPerRow:4,
      itemSpacing: 10,
      items: [],
      backgroundColor: {id: i, red: 0, green: 0, blue: 0, alpha: 0.15}
    }

    for (var i = 0; i < 24; i++) {
      var item = {id: i, red: getRand(255, 1), green: getRand(255, 1), blue: getRand(255, 1), alpha: getRand(100, 100), count: 0};
      $rootScope.colorData.items.push(item);
    }
    
    $rootScope['currentSet'] = null;
    $rootScope['currentInd'] = null;
  } 

  function getRand(max, divider) {
    return (Math.round(Math.random()*max) + 1)/divider;
  }

  $rootScope.clearData();
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'NavCtrl'
  })
  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'AppCtrl'
      }
    }
  })
  .state('app.results', {
      url: '/results',
      views: {
        'menuContent': {
          templateUrl: 'templates/results.html',
          controller: 'AppCtrl'
      }
    }
  })
  .state('app.load', {
      url: '/load',
      views: {
        'menuContent': {
          templateUrl: 'templates/load.html',
          controller: 'LoadCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
