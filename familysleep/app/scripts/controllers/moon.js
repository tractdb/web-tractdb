'use strict';

/**
 * @ngdoc function
 * @name FamilySleep.controller:MoonctrlCtrl
 * @description
 * # MoonctrlCtrl
 * Controller of the FamilySleep
 */
angular.module('FamilySleep')
  .controller('MoonCtrl', ['$scope', '$rootScope', 'tractdbFactory', 'dateFactory', 'personaFactory',
  	function ($scope, $rootScope, tractdbFactory, dateFactory, personaFactory) {


    $scope.moonImage = 'app/images/moons/moon7a.png';

    $rootScope.$on('familydailyview:updated', function() {
      updateMoon();
    });

    var updateMoon = function() {
    	var totalSleep = 0;
		var i = 0;
		var tractdbData = tractdbFactory.tractdbData;
		var duration, pid, date;
		var pids = personaFactory.getAllIDs();
		if(tractdbData != null){
			date = dateFactory.getDateString();
			for (var i = pids.length - 1; i >= 0; i--) {
				pid = pids[i];
				duration = tractdbData[pid][date].duration;
				if(duration == -1){
					totalSleep+=0;
				} else {
					totalSleep +=duration;
				}
			}
		} else {
			totalSleep = 0;
		}
		
		// angular.forEach(famDailySleep.sleep_data, function(person){
  // 			i++;
  // 			totalSleep = totalSleep+person[dateFactory.getDateString()].duration/1000/60/60;
		// });
		
		var avgSleep = totalSleep/(pids.length);
		var percentage = avgSleep/24; // would be their total targetsleephours divided by i
		console.log(percentage);
		if(percentage < (1/6)) {
			$scope.moonImage = 'app/images/moons/moon7a.png';
		} else if (percentage < (2/6)) {
			$scope.moonImage = 'app/images/moons/moon6.png';
		} else if (percentage < (3/6)) {
			$scope.moonImage = 'app/images/moons/moon5.png';
		} else if (percentage < (4/6)) {
			$scope.moonImage = 'app/images/moons/moon4.png';
		} else if (percentage < (5/6)) {
			$scope.moonImage = 'app/images/moons/moon3.png';
		} else {
			$scope.moonImage = 'app/images/moons/moon2.png';
		}



		//console.log();//['mom'][newDate].duration
    }

    tractdbFactory.observe($scope, updateMoon);
  }]);
