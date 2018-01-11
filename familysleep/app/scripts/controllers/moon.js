'use strict';

/**
 * @ngdoc function
 * @name FamilySleep.controller:MoonctrlCtrl
 * @description
 * # MoonctrlCtrl
 * Controller of the FamilySleep
 */
angular.module('FamilySleep')
  .controller('MoonCtrl', ['$scope', '$rootScope', 'tractdbFactory', 'dateFactory', 'personaFactory', 'selfReportState',
  	function ($scope, $rootScope, tractdbFactory, dateFactory, personaFactory, selfReportState) {


    $scope.moonImage = 'app/images/moons/moon7a.png';

    //familydailyview:updateMoon
    //modalview:updateMoon
    // $rootScope.$on('familydailyview:updated', function() {
    //   updateMoon();
    // });

    $rootScope.$on('modalview:updated', function() {
      updateMoon();
    });


    var updateMoon = function() {
    	var totalSleep = 0;
		var i = 0;
		var tractdbData = tractdbFactory.tractdbData;
		var duration, hours, pid, date;
		var pids = personaFactory.getAllIDs();
		var calendarDate = dateFactory.getDateString();
		var today = dateFactory.getTodayString();
		var states = selfReportState.getAllMoodsDay(pids, calendarDate);
		if(tractdbData != null){
			angular.forEach(states, function(value, key){
				//if state is not null
				//then add to totalSleep
				duration = tractdbData[key][calendarDate].duration;
				if(calendarDate == today){
					if((states[key].state) && (duration !=-1)){
						hours = duration / 1000 / 60 / 60;
						totalSleep +=hours;
					}
				} else {
					hours = duration / 1000 / 60 / 60;
					totalSleep +=hours;
				}

				
				
				//otherwise don't do anything.
				// for (var i = pids.length - 1; i >= 0; i--) {
				// 	pid = pids[i];
				// 	duration = tractdbData[pid][date].duration;
				// 	if(duration == -1){
				// 		totalSleep+=0;
				// 	} else {
				// 		totalSleep +=duration;
				// 	}
				// }
			});
		} else {
			totalSleep = 0;
		}
		
		// angular.forEach(famDailySleep.sleep_data, function(person){
  // 			i++;
  // 			totalSleep = totalSleep+person[dateFactory.getDateString()].duration/1000/60/60;
		// });
		
		var avgSleep = totalSleep/(pids.length);
		var percentage = avgSleep/24; // would be their total targetsleephours divided by i

		// if(percentage < (1/6)) {
		// 	$scope.moonImage = 'app/images/moons/moon7a.png';
		// } else if (percentage < (3/6)) {
		// 	$scope.moonImage = 'app/images/moons/moon4.png';
		// } else if (percentage < (4/6)) {
		// 	$scope.moonImage = 'app/images/moons/moon3.png';
		// } else {
		// 	$scope.moonImage = 'app/images/moons/moon2.png';
		// }
		//console.log(percentage);
		if(avgSleep < (1/7)) {
			$scope.moonImage = 'app/images/moons/moon7a.png';
		} else if (avgSleep < (2/7)) { 
			$scope.moonImage = 'app/images/moons/moon6.png';
		} else if (avgSleep < (3/7)) {
			$scope.moonImage = 'app/images/moons/moon5.png';
		} else if (avgSleep < (4/7)) {
			$scope.moonImage = 'app/images/moons/moon4.png';
		} else if (avgSleep < (5/7)) {
			$scope.moonImage = 'app/images/moons/moon3.png';
		} else if (avgSleep < (5/7)){
			$scope.moonImage = 'app/images/moons/moon2.png';
		} else {
			$scope.moonImage = 'app/images/moons/moon1.png';
		}



		//console.log();//['mom'][newDate].duration
    }

    tractdbFactory.observe($scope, updateMoon);
  }]);
