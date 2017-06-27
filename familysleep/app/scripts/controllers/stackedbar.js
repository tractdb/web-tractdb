'use strict';

/**
* @ngdoc function
* @name FamilySleep.controller:StackedbarCtrl
* @description
* # StackedbarCtrl
* Controller of the FamilySleep
*/
/****TODOS:
1. Figure out how to get rid of space between bars
2. change y label so that it shows text instead of a number
3. when hover show only one value
**/
angular.module('FamilySleep')
.controller('StackedbarCtrl', ['$scope', function ($scope) { 
  // function getLabels() {
  //   var result = [];
  //   for (var i = 0; i < 400; i++) {
  //     result.push(newDate(i));
  //   }
  //   //console.log(result);
  //   return result; //bars do not show up a line because the moments has seconds so that bar will allign to the minute based on the seconds
  // }

  // function newDate(min) {
  //   return moment("2016-07-22T18:11:00.000").add(min, 'm');
  // }
}]);
