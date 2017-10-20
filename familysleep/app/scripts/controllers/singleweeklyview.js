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
	'$scope', 'sleepWeeklyDataFactory', 'tractdbFactory',  '$rootScope', 'dateFactory', '$routeParams', 'personaFactory', 'selfReportState', 
	function ($scope, singleWeeklySleep, tractdbFactory, $rootScope, dateFactory, $routeParams, personaFactory, selfReportState) {

	var viewModel = this;
	viewModel.familyInfo = null;
	viewModel.id = $routeParams.id;
	viewModel.date;
	viewModel.date = dateFactory.getDateString();
    viewModel.updateFamilyInfo = function(){
    	//MIGHT NEED THE DATE HERE AS WELL
    	//var date = dateFactory.getDateString();
    	//THIS COULD RETURN AN OBJECT SO THAT IT CAN BE USED IN THE FOR EACH?
    	viewModel.state = selfReportState.getMoodWeekly(viewModel.id, viewModel.date);
    	var persona = personaFactory.personas[viewModel.id];
    	console.log('persona');
    	console.log(persona);
    	tractdbFactory.setQuery('singleweekly', viewModel.id, viewModel.date);
    	var tractdbData = tractdbFactory.tractdbData;
    	console.log('tractdbData');
    	console.log(tractdbData);
    	if (persona && tractdbData){
    		viewModel.familyInfo = persona;
    		console.log("tractdbData");
    		console.log(tractdbData);
    		//var m = Object.keys(tractdbData)[0];
    		//returns weekly sleep data
    		var week_data = tractdbData[viewModel.id];
    		viewModel.data = [];
    		angular.forEach(week_data, function(value, key){
    			var date = key;
    			//value is the content of the date object
    			//value <- week_date[date]
    			var day = {
    				data: [
    					value.minuteData.one,
    					value.minuteData.two,
    					value.minuteData.three
    				],
    				duration: value.duration,
    				labels: value.minuteData.labels,
    				date: value.dateOfSleep
    			}
    			viewModel.data.push(day);
    		});
    		 
    	}
    	viewModel.series = ["Sleep", "Movement", "Restless"];
    	viewModel.options = {
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
		viewModel.options_first = {
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

		viewModel.options_last = {
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

		viewModel.colors = [
			{
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
			}
		];

    }

    
    tractdbFactory.setQuery('singleweekly', viewModel.id, viewModel.date);
    //should it be $scope or viewModel? we should use them consistently
    personaFactory.observe($scope, viewModel.updateFamilyInfo);
    tractdbFactory.observe($scope, viewModel.updateFamilyInfo);
    selfReportState.observe($scope, viewModel.updateFamilyInfo);

	$rootScope.menu = [
	  {
		  title: 'Back',
		  url: 'familydailyview',
		  tag: 'family-daily-view'
	  },
	  {
		  title: 'Individual Daily View',
		  url: 'sdview/' + viewModel.id,
		  tag: 'individual-daily-view'
	  },
	  {
		  title: 'Individual Weekly View',
		  url: 'singleweeklyview/' + viewModel.id,
		  tag: 'individual-weekly-view'
	  }
	];

	$rootScope.active = 'individual-weekly-view';
	$rootScope.updateActive = function (item) {
	  $rootScope.active = item;
	};
	//console.log("in SingleweeklyviewCtrl");

	$scope.$on('date:updated', function() {
		viewModel.date = dateFactory.getDateString();
         tractdbFactory.setQuery('singleweekly', viewModel.id, viewModel.date);
        viewModel.updateFamilyInfo();
  	});


	var updateData = function () {/*
		if(dateFactory.getWeekDateString() != []) {
			var promise = dbdata.get_single_weekly_sleep_data(viewModel.id, dateFactory.getWeekDateString());
			
			promise.then(function(response) {
				console.log("in SingleweeklyviewCtrl");
				//console.log(singleWeeklySleep);
				var rawData = singleWeeklySleep.sleep_data[viewModel.id];
				viewModel.data = [];

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
					viewModel.data.push(day);
				});
				
				viewModel.options = {
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

				viewModel.options_first = {
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

				viewModel.options_last = {
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
				viewModel.colors = [{
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

				viewModel.series = ["Sleep", "Movement", "Restless"];
			});
		} else {
	    alert('date factory get week didnt populate');
	  }
	*/}
	//updateData();
}]);
