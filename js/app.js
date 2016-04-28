angular.module('wTap', ['ionic', 'angular-svg-round-progressbar'])

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

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/login');

  $stateProvider
  .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('signup', {
    url: '/signup',
    cache: false,
    templateUrl: 'templates/signup.html',
    controller: 'SignupCtrl'
  })

  .state('app', {
    url: '/app',
    templateUrl: 'templates/menu.html',
    controller: 'HomeCtrl'
  })

  .state('app.home', {
    url: '/app/home',
    templateUrl: 'templates/home.html'
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller:'HomeCtrl'
      }
    }
  })

  .state('app.health', {
    url: '/health',
    views: {
      'menuContent': {
        templateUrl: 'templates/health.html',
        controller: 'HealthCtrl'
      }
    }
  })

  .state('app.record', {
    url:'/record',
    views: {
      'menuContent': {
        templateUrl: 'templates/record.html',
        controller: 'RecordCtrl'
      }
    }
  })

  .state('app.orders', {
    url: '/orders',
    views: {
      'menuContent': {
        templateUrl: 'templates/orders.html'
      }
    }
  })
})
