'use strict';

/**
 * @ngdoc function
 * @name FamilySleep.controller:MoonctrlCtrl
 * @description
 * # MoonctrlCtrl
 * Controller of the FamilySleep
 */
angular.module('FamilySleep')
  .controller('MoonCtrl', ['$scope', '$rootScope', 'sleepFamDailyDataFactory', 'dateFactory',
  	function ($scope, $rootScope, famDailySleep, dateFactory) {


    $scope.moonImage = 'images/moons/moon7a.png';

    $rootScope.$on('familydailyview:updated', function() {
      updateMoon();
    });

    var updateMoon = function() {
    	var totalSleep = 0;
		var i = 0;
		angular.forEach(famDailySleep.sleep_data, function(person){
  			i++;
  			totalSleep = totalSleep+person[dateFactory.getDateString()].duration/1000/60/60;
		});
		
		var avgSleep = totalSleep/i;
		var percentage = avgSleep/24; // would be their total targetsleephours divided by i
		console.log(percentage);
		if(percentage < (1/6)) {
			$scope.moonImage = 'images/moons/moon7a.png';
		} else if (percentage < (2/6)) {
			$scope.moonImage = 'images/moons/moon6.png';
		} else if (percentage < (3/6)) {
			$scope.moonImage = 'images/moons/moon5.png';
		} else if (percentage < (4/6)) {
			$scope.moonImage = 'images/moons/moon4.png';
		} else if (percentage < (5/6)) {
			$scope.moonImage = 'images/moons/moon3.png';
		} else {
			$scope.moonImage = 'images/moons/moon2.png';
		}



		//console.log();//['mom'][newDate].duration
    }
  }]);
