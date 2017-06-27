'use strict';

/**
 * @ngdoc function
 * @name FamilySleep.controller:EmptybarchartCtrl
 * @description
 * # EmptybarchartCtrl
 * Controller of the FamilySleep
 */
angular.module('FamilySleep')
  .controller('EmptybarchartCtrl', function ($scope) {
  	$scope.color = ['#D6C3DB'];
  	$scope.data = [10];
  	$scope.labels = ['Test'];
  	$scope.options = {
  		scales: {
        xAxes: [{
          display:false,
          ticks: {
            min: 0,
            max: 10
          }
        }],
        yAxes: [{
          display:false
        }]
      },
      responsive:false,
      maintainAspectRatio: false,
      hover: { //to turn off hover
            mode: null
          },
          tooltips:{ //to turn off hover
            enabled: false
          },
  	};
  });
