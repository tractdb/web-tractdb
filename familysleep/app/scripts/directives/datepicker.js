'use strict';

/**
 * @ngdoc directive
 * @name FamilySleep.directive:datePicker
 * @description
   This datePicker directive is linked to template app/views/datepicker.html 
   It lets user select date of the showing of the sleep data and will automatically at 12:00AM in the morning
   regardless of the selected date
 * # datePicker
 */
angular.module('FamilySleep')
  .directive('datePicker', ['$rootScope', function ($rootScope) {
    return {
      templateUrl: 'app/views/datepicker.html',
      //restrict: 'E',
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the datePicker directive');
      // },
      controller: ['dateFactory', '$scope', '$route', '$timeout',
       function (dateFactory, $scope, $route, $timeout) {
        var _nextDateRefreshPromise;
		  	$scope.myDate = dateFactory.getDate().toDate();
    
		  	console.log("at datepickerjs")
		  	console.log($scope.myDate);
		  	$scope.isOpen = false;
		  	$scope.pickNewDate = function () {
		  		dateFactory.updateDate($scope.myDate, false);
		  		console.log($route.current.controller);
		  	};
        $scope.today = function () {
          $scope.myDate = new Date();
          dateFactory.updateDate($scope.myDate, false);
        };
        $scope.yesterday = function () {
          $scope.myDate = moment(dateFactory.getDate()).subtract(1, 'days').toDate();
          dateFactory.updateDate($scope.myDate, false);
        };
        $scope.tomorrow = function () {
          $scope.myDate = moment(dateFactory.getDate()).add(1, 'days').toDate();
          dateFactory.updateDate($scope.myDate, false);
        };

        // scheudles the next date refresh by waiting for the time difference between the current time and the next day to call 
        // refreshDate()
        var _scheduleNextDateRefresh = function() {
          $timeout.cancel(_nextDateRefreshPromise);
          _nextDateRefreshPromise = $timeout(refreshDate, moment("24:00:00", "hh:mm:ss").diff(moment(), 'milliseconds'));
        }

        var refreshDate = function() {
          // getting the current time and adding 1 mintute to make sure that we advance to the next day
          $scope.myDate = moment().add(1, 'minutes').toDate();
          dateFactory.updateDate($scope.myDate, true);
          _scheduleNextDateRefresh();
        }

        _scheduleNextDateRefresh();
		  }],
    };
  }])
  .config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format('ddd, MMM D ');
  };
  });
