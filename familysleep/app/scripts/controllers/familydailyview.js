'use strict';

// /*
// notes for what to do here. familyInfo needs to be instantiated from sleepFamDailyDataFactory
// selfReport stuff needs to be pushed into the sleepFamDailyDataFactory and maybe the weekly version.
// Right now after self-Report is saved to sleepFamilyDailyDataFactory it will be loosed because we can't write to file.
// throughout all the javascript for the family views I should fake that I have access to mood etc
// */
// var familyInfo = {
//   mom: {
//     type: "family",
//     sleep: null,
//     mood: selfReportState.mom.mood,
//     image: selfReportState.mom.image,
//     name: "mom",
//     pid: "f1m1",
//     avatar: "app/images/avatars/momcircle.png"
//   },
//   dad: {
//     type: "family",
//     sleep: null,
//     mood: selfReportState.dad.mood,
//     image: selfReportState.dad.image,
//     name: "dad",
//     pid: "f1m2",
//     avatar: "app/images/avatars/dadcircle.png"
//   },
//   girl: {
//     type: "family",
//     sleep: null,
//     mood: selfReportState.child1.mood,
//     image: selfReportState.child1.image,
//     name: "child1",
//     pid: "f1m3",
//     avatar: "app/images/avatars/girlcircle.png"
//   },
//   boy: {
//     type: "family",
//     sleep: null,
//     pid: "f1m4",
//     mood: selfReportState.child2.mood,
//     image: selfReportState.child2.image,
//     name: "child2",
//     avatar: "app/images/avatars/boycircle.png"
//   }
// };

var module = angular.module(
    'FamilySleep'
)


module.controller(
    'FamilyDailyViewCtrl',
    [
        '$scope', '$rootScope', 'tractdbFactory', 'sleepFamDailyDataFactory', 'dateFactory', 'selfReportState', 'personaFactory',
        function ($scope, $rootScope, tractdbFactory, sleepFamDailyDataFactory, dateFactory, selfReportState, personaFactory) {
            var viewModel = this;

            viewModel.familyInfo = null;

            viewModel.updateFamilyInfo = function () {
                var date = dateFactory.getDateString();

                var personas = personaFactory.personas;

                tractdbFactory.setQuery('familydaily', null, date);
                var tractdbData = tractdbFactory.tractdbData;

                if(personas && tractdbData) {
                    // start with the personas data
                    viewModel.familyInfo = personas;

                    // join in data from tractdb
                }

                // var newDate = dateFactory.getDateString();
                //
                // console.log(newDate);
                // if (dateFactory.getWeekDateString() != []) {
                //     var promise = dbdata.get_fam_daily_sleep_data(['mom', 'dad', 'girl', 'boy'], newDate);
                //
                //     promise.then(function (response) {
                //         /*$scope.data = [famDailySleep.sleep_data['mom'][newDate].duration/1000/60/60, (24-famDailySleep.sleep_data['mom'][newDate].duration/1000/60/60)];
                //          /****this is a temporary fix this will need to figure out once I fix the view
                //          $scope.id = famDailySleep.sleep_data['mom'][newDate].pid;
                //          $scope.data_dad = [famDailySleep.sleep_data['dad'][newDate].duration/1000/60/60, (24-famDailySleep.sleep_data['dad'][newDate].duration/1000/60/60)];
                //          $scope.data_girl = [famDailySleep.sleep_data['girl'][newDate].duration/1000/60/60, (24-famDailySleep.sleep_data['girl'][newDate].duration/1000/60/60)];
                //          $scope.data_boy = [famDailySleep.sleep_data['boy'][newDate].duration/1000/60/60, (24-famDailySleep.sleep_data['boy'][newDate].duration/1000/60/60)];*/
                //
                //         // if there is no data, sleep will be undefined.
                //
                //         for (var fam in familyInfo) {
                //             familyInfo[fam].sleep = [famDailySleep.sleep_data[fam][newDate].duration / 1000 / 60 / 60, (24 - famDailySleep.sleep_data[fam][newDate].duration / 1000 / 60 / 60)];
                //             //console.log("fam member sleep");
                //             //console.log(familyInfo[fam].sleep);
                //         }
                //         /*familyInfo.mom.sleep = [famDailySleep.sleep_data['mom'][newDate].duration/1000/60/60, (24-famDailySleep.sleep_data['mom'][newDate].duration/1000/60/60)];
                //          familyInfo.dad.sleep = [famDailySleep.sleep_data['dad'][newDate].duration/1000/60/60, (24-famDailySleep.sleep_data['dad'][newDate].duration/1000/60/60)];
                //          familyInfo.child1.sleep = [famDailySleep.sleep_data['girl'][newDate].duration/1000/60/60, (24-famDailySleep.sleep_data['girl'][newDate].duration/1000/60/60)];
                //          familyInfo.child2.sleep = [famDailySleep.sleep_data['boy'][newDate].duration/1000/60/60, (24-famDailySleep.sleep_data['boy'][newDate].duration/1000/60/60)];*/
                //         /****this is a temporary fix this will need to figure out once I fix the view
                //          $scope.id = famDailySleep.sleep_data['mom'][newDate].pid;
                //          $scope.data_dad = [famDailySleep.sleep_data['dad'][newDate].duration/1000/60/60, (24-famDailySleep.sleep_data['dad'][newDate].duration/1000/60/60)];
                //          $scope.data_girl = [famDailySleep.sleep_data['girl'][newDate].duration/1000/60/60, (24-famDailySleep.sleep_data['girl'][newDate].duration/1000/60/60)];
                //          $scope.data_boy = [famDailySleep.sleep_data['boy'][newDate].duration/1000/60/60, (24-famDailySleep.sleep_data['boy'][newDate].duration/1000/60/60)];*/
                //
                //         $scope.family = familyInfo;
                //         console.log($scope.family);
                //
                //         $scope.labels = ['hours slept', 'hours awake'];
                //         /*define colors here*/
                //         $scope.colors = ['#0000FF', '#E0E0E0'];
                //         $scope.options = {
                //             cutoutPercentage: 70
                //         };
                //         $rootScope.$broadcast('familydailyview:updated');
                //     });
                // } else {
                //     alert('date factory get week didnt populate');
                // }
            }

            personaFactory.observe($scope, viewModel.updateFamilyInfo);
            tractdbFactory.observe($scope, viewModel.updateFamilyInfo);

            //
            // Current approach to showing the menu for choosing views
            //
            $rootScope.menu = [
                {
                    title: 'Family Daily View',
                    url: 'familydailyview',
                    tag: 'family-daily-view',
                },
                {
                    title: 'Family Weekly View',
                    url: 'famweeklyview',
                    tag: 'family-weekly-view',
                }
            ];

            $rootScope.active = 'family-daily-view';
            $rootScope.updateActive = function (item) {
                $rootScope.active = item;
            };

            $scope.$on('date:updated', function () {
                viewModel.updateFamilyInfo();
            });


        }]);