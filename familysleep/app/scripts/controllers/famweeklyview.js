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
  	'$scope', '$rootScope', 'tractdbdata', 'sleepFamWeeklyDataFactory', 'dateFactory', 'personaFactory', function(
  		$scope, $rootScope, dbdata, famWeeklySleep, dateFactory, personaFactory) {
	$rootScope.menu = [
		{
		    title: 'Family Daily View',
		    url: '#!/familydailyview',
		    tag: 'family-daily-view',
		},
		{
		    title: 'Family Weekly View',
		    url: '#!/famweeklyview',
		    tag: 'family-weekly-view',
		}
    ];
    
    $rootScope.active = 'family-weekly-view';
    $rootScope.updateActive = function (item) {
      $rootScope.active = item;
    };

    $scope.$on('date:updated', function() {
      updateData();
    });
    $scope.famWeekData;
    $scope.dateWeekStr;
    var updateData = function () {
      $scope.dateWeekStr = dateFactory.getWeekDateString();
      console.log("dateWeekStr");
      console.log($scope.dateWeekStr);
      //var dateWeek = dateFactory.getWeekDate();
      //console.log("dateWeek");
      //console.log(dateWeek);
      if(dateFactory.getWeekDateString() != []) {
        var promise = dbdata.get_fam_weekly_sleep_data(['mom','dad','girl','boy'], $scope.dateWeekStr);
        promise.then(function(response) {
        	console.log('in family weekly view');
          //console.log(famWeeklySleep.sleep_data);
          $scope.famWeekData = famWeeklySleep.sleep_data;
          //console.log(famWeekData);
          for (var fam in $scope.famWeekData){
            //console.log(fam)
            var nights = $scope.famWeekData[fam];
            //console.log(nights);
            for(var night in nights){
              //console.log("in nights loop");
              var data = nights[night];
              //console.log(data.dateOfSleep);
              //console.log("duration");
              //console.info(data.duration);
              data.sleep = [data.duration/1000/60/60, (24-data.duration/1000/60/60)];
              //console.log(data.sleep);
              //night.sleep = night.duration/1000/60/60;
              //night[sleep] = [];
              //night.sleep = [0, 5];
            }
          }
          //console.log($scope.famWeekData);
          $scope.labels = ['hours slept','hours awake'];
         /*define colors here*/
         $scope.colors = ['#0000FF', '#E0E0E0'];
         $scope.options = {
              cutoutPercentage: 70
         };
          //console.log($scope.famWeekData.mom['2017-05-07'].duration);
      	});
      } else {
        alert('date factory get week didnt populate');
      }
    }
    updateData();
    //$scope.famWeekData = famWeeklySleep.sleep_data;
}]);
