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
    
        ['$scope', '$rootScope', 'tractdbFactory', 'sleepFamDailyDataFactory', 'dateFactory', 'selfReportState', 'personaFactory', '$location',
            function ($scope, $rootScope, tractdbFactory, sleepFamDailyDataFactory, dateFactory, selfReportState, personaFactory, $location) {
                var viewModel = this;

                viewModel.familyInfo = null;

                viewModel.updateFamilyInfo = function () {
                    //TODO: date needs to change if calendar date changes
                    //var date = dateFactory.getDateString();
                    //console.log("date from FDV");
                    //console.log(date);
                    var personas = personaFactory.personas;

                    var tractdbData = tractdbFactory.tractdbData;
                    ////console.log("queried data");
                    ////console.log(tractdbData);

                    if(personas && tractdbData) {
                        // start with the personas data
                        viewModel.familyInfo = personas;
                        console.log('in family-daily-view');
                        console.log('viewModel.familyInfo');
                        console.log(viewModel.familyInfo);
                        // join in persona with tractdb
                        //console.log("in forEach");
                        angular.forEach(tractdbData, function(value, key){
                            var famID = key;
                            //console.log("famID = " + famID);
                            var d = Object.keys(value)[0];
                            var sleep_data = value[d];
                            var hours = sleep_data.duration / 1000 / 60 / 60;
                            var targetedHours = viewModel.familyInfo[famID].targetedHours;
                             //console.log("hours needed to sleep = " + targetedHours);
                            //console.log("using duration hours sleept   = " + hours);

                            ////console.log(viewModel.familyInfo[famID]);
                            var delta = targetedHours - hours;
                            //console.log("delta hours = " + delta);
                            if(delta > 0){
                                //console.log('in delta > 0');
                                viewModel.familyInfo[famID].sleep = [0 , hours, delta]; //[extra hours, hours_slept, remainder]    
                            } else if(delta < 0){
                                //console.log('in delta < 0');
                                delta = Math.abs(delta);
                                // var t = hours-delta;
                                // console.log('t = ' + t);
                                viewModel.familyInfo[famID].sleep = [delta, hours, 0]; //[extra hours, hours_slept, remainder]
                            } else {
                                //console.log('in delta == 0');
                                viewModel.familyInfo[famID].sleep = [0, hours, 0]; //[extra hours, hours_slept, remainder]
                            }
                            //viewModel.familyInfo[famID].sleep = [1, 10, 0]; //[extra hours, hours_slept, remainder]
                            viewModel.familyInfo[famID].hours = hours;
                            //console.log("printting sleep array for " + famID);
                            //console.log(viewModel.familyInfo[famID].sleep);
                            //console.log(viewModel.familyInfo[famID].hours);
                        });
                        console.log('printing personas after forEach');
                        console.log(personaFactory.personas);
                        //could go here or might go out of outside of the if
                        //or might go outside of updateFamilyInfo
                        viewModel.labels = ['extra hours', 'hours slept', 'hours awake'];
                            //define colors here
                            viewModel.colors = ['#000066', '#0000FF', '#E0E0E0'];
                            // viewModel.options = {
                            //     borderColor: ['#000066', '#0000FF', '#E0E0E0'],
                            //     cutoutPercentage: 70
                            // };
                            viewModel.options = {
                                elements: {
                                    arc: {
                                        //borderColor: ['#000066', '#0000FF', '#E0E0E0'],
                                        borderWidth: 0
                                        
                                    }
                                },
                                cutoutPercentage: 65
                            };
                    }

            }

            var date = dateFactory.getDateString();
            tractdbFactory.setQuery('familydaily', null, date);

            //should it be $scope or viewModel? we should use them consistently
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

            //should replace to viewModel
            $scope.$on('date:updated', function () {
                //TODO: date needs to change if calendar date changes
              var date = dateFactory.getDateString();
              tractdbFactory.setQuery('familydaily', null, date);

                viewModel.updateFamilyInfo();
            });

            //should replace to viewModel
            $scope.changeView = function(id){
                //var view = '/familydailyview';
                console.log("in changeview FDV " + id);
                console.log('personas');
                console.log(personaFactory.personas);
                $location.path('/sdview/' + id);
            };
        }]);