'use strict';

angular
    .module('FamilySleep', [
        'angular-toArrayFilter',
        'chart.js',
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMaterial',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap',
        'tractdb.config'
    ])
    .config(function ($routeProvider, $locationProvider) {
        // Already set when we import tractdb.config
        //
        // $locationProvider.html5Mode(true);
        //

        $routeProvider
            .when('/', {
                templateUrl: 'app/views/familydailyview.html',
                controller: 'FamilyDailyViewCtrl',
                controllerAs: 'viewModel'
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
                controller: 'FamilyDailyViewCtrl',
                controllerAs: 'viewModel'
            })
            .when('/sdview/:id', {
                templateUrl: 'app/views/sdview.html',
                controller: 'SdviewCtrl',
                controllerAs: 'viewModel'
            })
            .when('/singleweeklyview/:id', {
                templateUrl: 'app/views/singleweeklyview.html',
                controller: 'SingleweeklyviewCtrl',
                controllerAs: 'viewModel'
            })
            .when('/famweeklyview', {
                templateUrl: 'app/views/famweeklyview.html',
                controller: 'FamweeklyviewCtrl',
                controllerAs: 'viewModel'
            })
            .when('/login', {
              templateUrl: 'app/views/login.html',
              controller: 'LoginCtrl',
              controllerAs: 'login'
            })
            .otherwise({ //I want to add an error page when we don't get to the right page
                redirectTo: '/'
                // I want to redirect to family dailyview
            });
    })
    .run(function( $rootScope, $location, $window, authFactory){
        $rootScope.$on('$routeChangeStart', function(event){
            var auth;
            auth = authFactory.isAuthenticated();

            auth.then(function(response){
                if(!authFactory.isLoggedIn()){
                    console.log('DENY');
                //event.preventDefault();
                    if ( $location.path() === "/login" ) {
                        //return;
                    }
                    else {
                        $location.path('/login');
                    }
                } else {
                    console.log('ALLOW');
                    //event.preventDefault();
                    //#!/familydailyview
                    //$location.path('/familysleep/'); //need to try familysleep/, or /familysleep/
                    //$window.location = $location.url('/familysleep/').url()
                    //$location.path('/familydailyview');
                }
            });
            //if(!authFactory.isLoggedIn()){
            // if(!authFactory.isAuthenticated()){
            //     console.log('DENY');
            //     //event.preventDefault();
            //     if ( $location.path() === "/login" ) {
            //         //return;
            //     }
            //     else {
            //         $location.path('/login');
            //     }
            // }
            // else {
            //     console.log('ALLOW');
            //     //event.preventDefault();
            //     //#!/familydailyview
            //     //$location.path('/familysleep/'); //need to try familysleep/, or /familysleep/
            //     //$window.location = $location.url('/familysleep/').url()
            //     //$location.path('/familydailyview')
            // }
        });
    });
