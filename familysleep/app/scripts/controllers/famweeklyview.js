'use strict';

/**
 * @ngdoc function
 * @name FamilySleep.controller:FamweeklyviewCtrl
 * @description
 * # FamweeklyviewCtrl
 * Controller of the FamilySleep
 */
angular.module('FamilySleep')
    .controller('FamweeklyviewCtrl', [
        '$scope', '$rootScope', 'tractdbFactory', 'sleepFamWeeklyDataFactory', 'dateFactory', 'personaFactory', 'selfReportState', 'viewLogs',
        function($scope, $rootScope, tractdbFactory, famWeeklySleep, dateFactory, personaFactory, selfReportState, viewLogs) {
            var viewModel = this;
            viewModel.familyInfo = null;
            //viewModel.personas = null;
            
            viewModel.dateWeekStr = dateFactory.getWeekDateString();
            viewModel.today = dateFactory.getTodayString();
            viewModel.calendarDate = dateFactory.getDateString();
            //console.log('week dates');
            console.log(viewModel.dateWeekStr);
            viewModel.updateWeekFamilyInfo = function(){
                //console.log('familyweekly');
                //selected date and the query returns a week of data from the data
                //viewModel.date = dateFactory.getDateString();
                // console.log("dateWeekStr with just calling one date");
                // console.log(viewModel.date);
                var personas = personaFactory.personas;
                var pids = personaFactory.getAllIDs();
                // console.log('personas');
                // console.log(personas);
                tractdbFactory.setQuery('familyweekly', null, viewModel.calendarDate);
                var tractdbData = tractdbFactory.tractdbData;
                viewModel.states = selfReportState.getAllMoodsWeek(pids, viewModel.dateWeekStr);
                // console.log("queried data");
                // console.log(tractdbData);
                if(personas && tractdbData){
                    viewModel.familyInfo = personas;
                    //console.log("familyInfo object before adding sleep");
                    //console.log(viewModel.familyInfo);
                    //join persona and tractdbdata
                    angular.forEach(tractdbData, function(value, key){
                        var famID = key;
                        //console.log("famID = " + famID);
                        var dates = Object.keys(value);
                        //console.log(dates);
                        viewModel.familyInfo[famID].days = {};
                        // console.log("familyInfo by ID days");
                        // console.log(viewModel.familyInfo[famID].days);
                        for (var i = dates.length - 1; i >= 0; i--) {
                            var d = dates[i];
                            var sleep_data = tractdbData[famID][d];
                            viewModel.familyInfo[famID].days[d] = {};
                            console.log(sleep_data);
                            if(sleep_data.duration == -1){
                                viewModel.familyInfo[famID].days[d].duration = -1;
                                viewModel.familyInfo[famID].days[d].sleep = [200];
                                viewModel.familyInfo[famID].days[d].hours = 0;
                                viewModel.familyInfo[famID].days[d].date = d;
                                viewModel.familyInfo[famID].days[d].labels = ['no sleep'];
                                viewModel.familyInfo[famID].days[d].colors = ['#D6C3DB'];
                                viewModel.familyInfo[famID].days[d].options = {
                                    elements: {
                                        arc: {
                                            //borderColor: ['#000066', '#0000FF', '#E0E0E0'],
                                            borderWidth: 0
                                        }
                                    },
                                    cutoutPercentage: 65,
                                    animation: false,
                                    hover: {mode: null},
                                    tooltips: {enabled: false}
                                };
                            } else {
                                var hours = sleep_data.duration / 1000 / 60 / 60;
                                var targetedHours = viewModel.familyInfo[famID].targetedHours;
                                var delta = targetedHours - hours;  

                                if (delta > 0){
                                    //console.log('in delta > 0');
                                    viewModel.familyInfo[famID].days[d].sleep = [0 , hours, delta]; //[extra hours, hours_slept, remainder]    
                                } else if (delta < 0){
                                    //console.log('in delta < 0');
                                    delta = Math.abs(delta);
                                    // var t = hours-delta;
                                    // console.log('t = ' + t);
                                    viewModel.familyInfo[famID].days[d].sleep = [delta, hours, 0]; //[extra hours, hours_slept, remainder]
                                } else {
                                    //console.log('in delta == 0');
                                    viewModel.familyInfo[famID].days[d].sleep = [0, hours, 0]; //[extra hours, hours_slept, remainder]
                                }  
                                //viewModel.familyInfo[famID].days[d].sleep = [0, hours, 0];
                                viewModel.familyInfo[famID].days[d].hours = hours;
                                viewModel.familyInfo[famID].days[d].duration = sleep_data.duration;
                                viewModel.familyInfo[famID].days[d].date = d;
                                //console.log(viewModel.familyInfo[famID][d]);
                                viewModel.familyInfo[famID].days[d].labels = ['extra hours', 'hours slept', 'hours awake'];
                                //define colors here
                                viewModel.familyInfo[famID].days[d].colors = ['#000066', '#0000FF', '#E0E0E0'];
                                // viewModel.options = {
                                //     borderColor: ['#000066', '#0000FF', '#E0E0E0'],
                                //     cutoutPercentage: 70
                                // };
                                viewModel.familyInfo[famID].days[d].options = {
                                    elements: {
                                        arc: {
                                            //borderColor: ['#000066', '#0000FF', '#E0E0E0'],
                                            borderWidth: 0
                                            
                                        }
                                    },
                                    cutoutPercentage: 65,
                                    animation: false,
                                    hover: {mode: null},
                                    tooltips: {enabled: false}
                                };
                            }
                            
                        }
                        //console.log('familyInfo after forEach');
                        //console.log(viewModel.familyInfo[famID]);
                    });
                    // console.log("printing familyInfo with sleep data");
                    // console.log(viewModel.familyInfo);
                }
            }

            //$scope.famWeekData = famWeeklySleep.sleep_data;

            //I don't know if I need a personFactory.observe
            personaFactory.observe($scope, viewModel.updateWeekFamilyInfo);
            tractdbFactory.observe($scope, viewModel.updateWeekFamilyInfo);
            selfReportState.observe($scope, viewModel.updateFamilyInfo);
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

                $rootScope.active = 'family-weekly-view';
                $rootScope.updateActive = function (item) {
                  $rootScope.active = item;
                  viewLogs.logPage(item, dateFactory.getDateString());
                };

                //need to check I need to use viewModel
                $scope.$on('date:updated', function() {
                    viewModel.dateWeekStr = dateFactory.getWeekDateString();
                    viewModel.today = dateFactory.getTodayString();
                    viewModel.calendarDate = dateFactory.getDateString();
                    //tractdbFactory.setQuery('familyweekly', null, viewModel.calendarDateview                    
                    viewModel.updateWeekFamilyInfo();
                });

}]);
