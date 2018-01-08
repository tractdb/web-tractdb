'use strict';

/**
 * @ngdoc function
 * @name FamilySleep.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the FamilySleep
 */
/**angular.module('FamilySleep')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });**/	

angular.module('FamilySleep')
.controller('AboutCtrl', ['$scope', '$location', function ($scope, $location) {
	$scope.changeView = function(){
		var view = '/familydailyview';
		$location.path(view);
	}
}]);
