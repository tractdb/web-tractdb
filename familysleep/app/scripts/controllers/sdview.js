'use strict';

/**
 * @ngdoc function
 * @name FamilySleep.controller:SdviewCtrl
 * @description
 * # SdviewCtrl
 * Controller of the FamilySleep
 */
 angular.module('FamilySleep')
 	.controller('SdviewCtrl', ['$rootScope', '$scope', 'sleepDailyDataFactory', '$routeParams', 'tractdbdata', 'dateFactory', 'personaFactory',
    function($rootScope, $scope, sleepDataFactory, $routeParams, dbdata, dateFactory, personaFactory) {
    //$scope.id = $routeParams.id;
    if($routeParams.id=='child1'){
      $scope.id = 'boy';
    } else if ($routeParams.id=='child2')
    {
      $scope.id = 'girl';
    } else{
      $scope.id = $routeParams.id;
    };
    console.log("in SdviewCtrl");

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
    $rootScope.active = 'individual-daily-view';
    $rootScope.updateActive = function (item) {
      $rootScope.active = item;
    };

    $scope.$on('date:updated', function() {
      updateData();
    });

    var updateData = function() {
      var newDate = dateFactory.getDateString();
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
    }
    updateData();
  }]);
