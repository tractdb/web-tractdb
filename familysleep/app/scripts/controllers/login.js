'use strict';

/**
 * @ngdoc function
 * @name FamilySleep.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the FamilySleep
 */
angular.module('FamilySleep')
	.controller('LoginCtrl', 
	[
		'$scope', '$http', '$location', '$window','BASEURL_PYRAMID', 
		function ($scope, $http, $location, $window, BASEURL_PYRAMID) {


            $scope.submitLoginForm = function () {
                $http({
                    method: 'POST',
                    url: BASEURL_PYRAMID + '/login',
                    data: {
                        'account': $scope.account,
                        'password': $scope.password
                    }
                }).then(
                    // successful response
                    function (response) { //taking them to family dailyview
                        $window.location = $location.url('familysleep/').url()
                    },
                    // error response
                    function (response) {
                        window.alert('Invalid account or password.');
                    }
                );
            }
		}
	]
  );

