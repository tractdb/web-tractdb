'use strict';

/**
 * @ngdoc directive
 * @name FamilySleep.directive:datePicker
 * @description
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
        var _nextRetrievePromise;
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

        var _scheduleNextRetrieve = function() {
          $timeout.cancel(_nextRetrievePromise);
          console.log(moment("24:00:00", "hh:mm:ss").diff(moment(), 'milliseconds'));
          _nextRetrievePromise = $timeout(refreshDate, moment("24:00:00", "hh:mm:ss").diff(moment(), 'milliseconds'));
        }

        var refreshDate = function() {
          $scope.myDate = moment(dateFactory.getDate()).add(1, 'days').toDate();
          dateFactory.updateDate($scope.myDate, true);
          _scheduleNextRetrieve();
        }

        _scheduleNextRetrieve();
		  }],
    };
  }]);
