'use strict';

/**
 * @ngdoc function
 * @name FamilySleep.controller:SingleweeklyviewCtrl
 * @description
 * # SingleweeklyviewCtrl
 * Controller of the FamilySleep
 */


angular.module('FamilySleep')
  .controller('SingleweeklyviewCtrl', [
	'$scope', 'sleepWeeklyDataFactory', 'tractdbdata',  '$rootScope', 'dateFactory', '$routeParams', 'personaFactory', function (
		$scope, singleWeeklySleep, dbdata, $rootScope, dateFactory, $routeParams, personaFactory) {

	
	if($routeParams.id=='child1'){
      $scope.id = 'boy';
    } else if ($routeParams.id=='child2')
    {
      $scope.id = 'girl';
    } else {
    	$scope.id = $routeParams.id;
    }
	$rootScope.menu = [
	  {
		  title: 'Back',
		  url: '#!/familydailyview',
		  tag: 'family-daily-view'
	  },
	  {
		  title: 'Individual Daily View',
		  url: '#!/sdview/' + $scope.id,
		  tag: 'individual-daily-view'
	  },
	  {
		  title: 'Individual Weekly View',
		  url: '#!/singleweeklyview/' + $scope.id,
		  tag: 'individual-weekly-view'
	  }
	];

	$rootScope.active = 'individual-weekly-view';
	$rootScope.updateActive = function (item) {
	  $rootScope.active = item;
	};
	console.log("in SingleweeklyviewCtrl");

	$scope.$on('date:updated', function() {
    updateData();
  });

	var updateData = function () {
		if(dateFactory.getWeekDateString() != []) {
			var promise = dbdata.get_single_weekly_sleep_data($scope.id, dateFactory.getWeekDateString());
			
			promise.then(function(response) {
				console.log("in SingleweeklyviewCtrl");
				//console.log(singleWeeklySleep);
				var rawData = singleWeeklySleep.sleep_data[$scope.id];
				$scope.data = [];

				angular.forEach(rawData, function(item) {
					var day = {
						data: [
						  item.minuteData.one, 
						  item.minuteData.two,
						  item.minuteData.three,
						],
						duration:item.duration,
						labels : item.labels,
						date: item.dateOfSleep,
						mood: item.mood
					}
					//console.log(day.duration);
					$scope.data.push(day);
				});
				
				$scope.options = {
					scales: {
					  xAxes: [{
						display: false,
						barThickness : 1,
					  }],
					  yAxes: [{
						display: false
					  }]	
					},
					hover: { //to turn off hover
						mode: null
					},
					tooltips:{ //to turn off hover
						enabled: false
					},
					legend: {
					  display: false
					},
					responsive:false,
    				maintainAspectRatio: false
				};

				$scope.options_first = {
					layout: {
			            padding: {
			                left: 0,
			                right: 0,
			                top: 18,
			                bottom: 0
			            }
			        },
					scales: {
					  xAxes: [{
						stacked: true,
						categoryPercentage: 1,
						barPercentage: 1,
						barThickness : 1,
						type: 'time',
						position: 'top',
						gridLines: {
						  display: false, // Set to false here => xAxis labels displayed out of canvas
						  offsetGridLines: true,
						},
						ticks: {
						  display: true,
						  fontSize: 12,
						  fontColor: 'white',
						  fontFamily: 'HelveticaNeue, HelveticaNeue, Roboto, ArialRounded',
						  autoSkip: true,
						  maxTicksLimit: 20
						},
						time: {
						  displayFormats: {
							minute: 'HH:mm a'
						  },
						  tooltipFormat: 'YYYY-MM-DD HH:mm a',
						  unit: "minute",
						  unitStepSize: 15,
						},
						showXLabel: 60
					  }],
					  yAxes: [{
						display: false
					  }]
					},
					hover: { //to turn off hover
						mode: null
					},
					tooltips:{ //to turn off hover
						enabled: false
					},
					legend: {
					  display: false
					},
					responsive:false,
    				maintainAspectRatio: false
				};

				$scope.options_last = {
					layout: {
			            padding: {
			                left: 0,
			                right: 0,
			                top: 0,
			                bottom: 25
			            }
			        },
					scales: {
					  xAxes: [{
						stacked: true,
						categoryPercentage: 1,
						barPercentage: 1,
						barThickness : 1,
						type: 'time',
						gridLines: {
						  display: false, // Set to false here => xAxis labels displayed out of canvas
						  offsetGridLines: true,
						},
						ticks: {
						  display: true,
						  fontSize: 12,
						  fontColor: 'white',
						  fontFamily: 'HelveticaNeue, HelveticaNeue, Roboto, ArialRounded',
						  autoSkip: true,
						  maxTicksLimit: 20
						},
						time: {
						  displayFormats: {
							minute: 'HH:mm a'
						  },
						  tooltipFormat: 'YYYY-MM-DD HH:mm a',
						  unit: "minute",
						  unitStepSize: 15,
						},
						showXLabel: 60
					  }],
					  yAxes: [{
						display: false
					  }]
					},
					hover: { //to turn off hover
						mode: null
					},
					tooltips:{ //to turn off hover
						enabled: false
					},
					legend: {
					  display: false
					},
					responsive:false,
    				maintainAspectRatio: false
				};
				$scope.colors = [{
					backgroundColor: "#44d2d1",
					borderColor: "#44d2d1",
					pointBackgroundColor: "#44d2d1",
					pointBorderColor: "#44d2d1"
				},
				{
					backgroundColor: "#551A8B",
					borderColor: "#551A8B",
					pointBackgroundColor: "#551A8B",
					pointBorderColor: "#551A8B"
				},
				{
					backgroundColor: "#FC3F73",
					borderColor: "#FC3F73",
					pointBackgroundColor: "#FC3F73",
					pointBorderColor: "#FC3F73"
				}];

				$scope.series = ["Sleep", "Movement", "Restless"];
			});
		} else {
	    alert('date factory get week didnt populate');
	  }
	}
	updateData();
}]);
