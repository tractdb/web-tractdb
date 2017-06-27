'use strict';

/**
 * @ngdoc service
 * @name FamilySleep.dateFactory
 * @description
 * # dateFactory
 * Factory in the FamilySleep.
 */


angular.module('FamilySleep')
  .factory('dateFactory', function ($rootScope) {
    //I think we might want get/sets here

    // contains moment object
    var date = moment();
    var date_week = [];

    var updateDate = function(newDate) {
      date = moment(newDate);
      // updating week array
      date_week = [];

      var dayOfWeek = date.day();
      for (var i = 0; i < 7; i++) {
        var newDate = moment(date).subtract(i, 'days');
        date_week.push(newDate);  
      }
      
      console.log(date_week);
      console.log('in dateFactory');
      console.log(date.format());
      $rootScope.$broadcast('date:updated');
    };

    updateDate(date);

    var getDate = function() {
      return date;
    };

    var getDateString = function() {
      //var tempDate = "2016-07-29";
      /*date = moment(tempDate).format('YYYY-MM-DD');
      return date;*/
      //to return today uncomment below
      return date.format('YYYY-MM-DD');
    };

    var getWeekDateString = function() {
      var result = [];
      for (var i = 0; i < date_week.length; i++) {
        result.push(date_week[i].format('YYYY-MM-DD'));
      }
      return result;
    };

    var getWeekDate = function() {
      return date_week;
    };

    var getToday = function(){
      var today = moment.format('YYYY-MM-DD HH:mm:ss');
      return
    };

    return{
      updateDate : updateDate,
      getDate : getDate,
      date: date,
      getDateString: getDateString,
      getWeekDate : getWeekDate,
      getWeekDateString : getWeekDateString,
      getToday: getToday

    };
  });

