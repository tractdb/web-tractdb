'use strict';

/**
 * @ngdoc overview
 * @name FamilySleep
 * @description
 * # FamilySleep
 *
 * Main module of the application.
 */
angular
  .module('FamilySleep', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'chart.js',
    'angular-toArrayFilter',
    'ngMaterial',
    'LocalStorageModule',
    'ngSanitize',
  ])
  .config(function ($routeProvider, $locationProvider, localStorageServiceProvider) {
    //can't get the removing hash to work
    //$locationProvider.html5Mode(true); //escaping hashtags all over the place

    localStorageServiceProvider
      .setPrefix('familySleep');


    $routeProvider
      .when('/', {
        templateUrl: 'app/views/familydailyview.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'app/views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/familydailyview', {
        templateUrl: 'app/views/familydailyview.html',
        controller: 'FamilydailyviewCtrl'
      })
      .when('/sdview/:id', {
        templateUrl: 'app/views/sdview.html',
        controller: 'SdviewCtrl'
      })
      .when('/singleweeklyview/:id', {
        templateUrl: 'app/views/singleweeklyview.html',
        controller: 'SingleweeklyviewCtrl'
      })
      .when('/famweeklyview', {
        templateUrl: 'app/views/famweeklyview.html',
        controller: 'FamweeklyviewCtrl'
      })
      .when('/fambarview', {
        templateUrl: 'app/views/fambarview.html',
        controller: 'FambarviewCtrl'
      })
      .otherwise({ //I want to add an error page when we don't get to the right page
        redirectTo: '/404.html'
      });
  });
