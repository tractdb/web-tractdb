'use strict';

/**
 * @ngdoc function
 * @name FamilySleep.controller:SdviewCtrl
 * @description
 * # SdviewCtrl
 * Controller of the FamilySleep
 */
angular.module('FamilySleep')
    .controller('SdviewCtrl', ['$rootScope', '$scope', '$routeParams', 'tractdbFactory', 'dateFactory', 'personaFactory', 'selfReportState',
        function($rootScope, $scope, $routeParams, tractdbFactory, dateFactory, personaFactory, selfReportState) {

        var viewModel = this;
        viewModel.familyInfo = null;
        viewModel.id = $routeParams.id;

        

        viewModel.updateFamilyInfo = function () {
          console.log("in SdviewCtrl");
            viewModel.id = $routeParams.id;

            viewModel.state = selfReportState.getMood(viewModel.id);
            // console.log("selfReportState");
            // console.log(selfReportState.states);
            // console.log("viewModel.state for " + viewModel.id);
            // console.log(viewModel.state);
            console.log('personas');
            console.log(personaFactory.personas);
            var persona = personaFactory.personas[viewModel.id];
            console.log('persona');
            console.log(persona);

            var tractdbData = tractdbFactory.tractdbData;
            if(persona && tractdbData) {
                //console.log("after if");
                // start with the personas data
                viewModel.familyInfo = persona;
                console.log('viewModel.familyInfo of single user');
                console.log(viewModel.familyInfo);
                console.log('tractdbData');
                console.log(tractdbData);
                var m = Object.keys(tractdbData)[0];
                var test = tractdbData[viewModel.id]; //should return object with date
                var d = Object.keys(test)[0];
                var sleep_data = test[d];
                //console.log(sleep_data);
                var hours = sleep_data.duration / 1000 / 60 / 60;
                // join in persona with tractdb
                var targetedHours = viewModel.familyInfo.targetedHours;
                var delta = targetedHours - hours;
                //viewModel.familyInfo[d] = {};
                if (delta > 0){
                    //console.log('in delta > 0');
                    //viewModel.familyInfo[d].sleep = [0 , hours, delta]; //[extra hours, hours_slept, remainder]    
                    viewModel.familyInfo.sleep = [0 , hours, delta]; //[extra hours, hours_slept, remainder]    
                } else if (delta < 0){
                    //console.log('in delta < 0');
                    delta = Math.abs(delta);
                    // var t = hours-delta;
                    // console.log('t = ' + t);
                    // viewModel.familyInfo[d].sleep = [delta, hours, 0]; //[extra hours, hours_slept, remainder]
                    viewModel.familyInfo.sleep = [delta, hours, 0]; //[extra hours, hours_slept, remainder]
                } else {
                    //console.log('in delta == 0');
                    // viewModel.familyInfo[d].sleep = [0, hours, 0]; //[extra hours, hours_slept, remainder]
                    viewModel.familyInfo.sleep = [0, hours, 0]; //[extra hours, hours_slept, remainder]
                }
                //viewModel.familyInfo.sleep = [1, 10, 0]; //[extra hours, hours_slept, remainder]
                // viewModel.familyInfo[d].hours = hours;
                viewModel.familyInfo.hours = hours;
                // viewModel.familyInfo[d].duration = sleep_data.duration;
                viewModel.familyInfo.duration = sleep_data.duration;
                console.log('familyInfo for = ' + viewModel.id);
                console.log(viewModel.familyInfo);
                //console.log('sleep data duration');
                //console.log(viewModel.familyInfo[d].duration);
            }


        }

        var date = dateFactory.getDateString();
        tractdbFactory.setQuery('singledaily', viewModel.id, date);

        //should it be $scope or viewModel? we should use them consistently
        personaFactory.observe($scope, viewModel.updateFamilyInfo);
        tractdbFactory.observe($scope, viewModel.updateFamilyInfo);
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
        $rootScope.active = 'individual-daily-view';
        $rootScope.updateActive = function (item) {
          $rootScope.active = item;
        };

        //does this need to be viewModel?
        $scope.$on('date:updated', function() {
          var date = dateFactory.getDateString();
          tractdbFactory.setQuery('singledaily', viewModel.id, date);

          viewModel.updateFamilyInfo();
        });
    var updateData = function() {
      /*var newDate = dateFactory.getDateString();
      if(dateFactory.getWeekDateString() != []) {
      var promise = dbdata.get_single_daily_sleep($scope.id, newDate);
      //have to wait for dbdate to populate 
      promise.then(function(response) {
        console.log('single daily');
        console.log($scope.id);
        console.log(sleepDataFactory);
        $scope.options = {
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
                fontColor: "white",
                fontSize: 10,
                fontFamily: 'HelveticaNeue, HelveticaNeue, Roboto, ArialRounded',
                autoSkip: true,
                maxTicksLimit: 20
              },
              time: {
                displayFormats: {
                  minute: 'HH:mm a'
                },
                tooltipFormat: 'HH:mm a',
                unit: "minute",
                unitStepSize: 1,
              },
              showXLabel: 60
            }],
            yAxes: [{
              // stacked: true, //scaleLabel: "<%=value%>",
              // ticks: {
              //   fontSize: 12,
              //   fontFamily: 'HelveticaNeue, HelveticaNeue, Roboto, ArialRounded'
              // },
              // gridLines: {
              //   display: false, // Set to false here => xAxis labels displayed out of canvas
              // },
              display: false
            }]
          },
          legend: {
            display: true,
            labels: {
              fontColor: "white"
            }
          }
        };

        $scope.data = [
            sleepDataFactory.sleep_data[$scope.id][newDate].minuteData.one, 
            sleepDataFactory.sleep_data[$scope.id][newDate].minuteData.two,
            sleepDataFactory.sleep_data[$scope.id][newDate].minuteData.three
        ];

        $scope.labels = sleepDataFactory.sleep_data[$scope.id][newDate].labels;

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
          }
        ];

        $scope.series = ["Sleep", "Movement", "Restless"];

      });
    }else {
        alert('date factory get week didnt populate');
      }
    */}
    //updateData();
  }]);
