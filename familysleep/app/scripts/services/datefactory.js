'use strict';

/**
 * @ngdoc service
 * @name FamilySleep.dateFactory
 * @description
 * # dateFactory
 * Factory in the FamilySleep.
 */


angular.module('FamilySleep')

  .factory('dateFactory', ['$rootScope', 'viewLogs', '$routeParams', '$route', '$timeout', function ($rootScope, viewLogs, $routeParams, $route, $timeout) {
    //I think we might want get/sets here

    // contains moment object
    var date = moment(); //I think this needs to be initialized in update date
    var date_week = [];
    var _nextRetrievePromise;

    var updateDate = function(newDate, isNewDay) {  
      date = moment(newDate);

      /****hard coding date
      var tempDate = "2017-07-01";
      date = moment(tempDate).format('YYYY-MM-DD');*/

      date_week = [];
      var dayOfWeek = date.day();
      for (var i = 0; i < 7; i++) {
        var newDate = moment(date).subtract(i, 'days');
        date_week.push(newDate);  
      }
      if(!isNewDay) {
        logPage();  
      }
      $rootScope.$broadcast('date:updated');
    };

    var logPage = function() {
      console.log($route.current.controller);
      if($rootScope.active && $rootScope.active.indexOf('weekly') == -1) {
        viewLogs.logPage($rootScope.active, getDateString(), $routeParams.id);
      } else if($rootScope.active && $rootScope.active.indexOf('daily') == -1){
        viewLogs.logPage($rootScope.active, getDateString(), $routeParams.id);
      } else if(!$rootScope.active && $route.current.controller != 'SignupCtrl') {
        viewLogs.logPage('family-daily-view', getDateString(), $routeParams.id);
      }
    }

    var getDate = function() {
      return date;
    };

    var getDateString = function() {
      /*var tempDate = "2017-07-01";
      date = moment(tempDate).format('YYYY-MM-DD');
      return date;*/
      
      return date.format('YYYY-MM-DD');
    };

    var getWeekDateString = function() {
      var result = [];
      for (var i = 0; i < date_week.length; i++) {
        result.push(date_week[i].format('YYYY-MM-DD'));
      }
      console.log('in getWeekDateString');
      console.log(result);
      return result;
    };

    //need to get week dates for a particular date
    // var getWeekDateString = function(date) {
    //   var result = [];
    //   for (var i = 0; i < date_week.length; i++) {
    //     result.push(date_week[i].format('YYYY-MM-DD'));
    //   }
    //   console.log('in getWeekDateString');
    //   console.log(result);
    //   return result;
    // };

    var getWeekDate = function() {
      return date_week;
    };

    var getTodayString = function(){
      var today = moment();

      //var today = moment.format('YYYY-MM-DD');
      return today.format('YYYY-MM-DD');
    };


    //TODO: need to figure out where to initialize these things together
    updateDate(date);
    return{
      updateDate : updateDate,
      getDate : getDate,
      date: date,
      getDateString: getDateString,
      getWeekDate : getWeekDate,
      getWeekDateString : getWeekDateString,
      getTodayString: getTodayString

    };
  }]);

