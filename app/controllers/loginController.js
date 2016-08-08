/**
 * Created by Tejas on 8/7/2016.
 */
angular.module("serverConfigApp.controllers").controller("loginController",
    [
        "$scope", "$http",
        function($scope, $http) {

            $http({
                method : "GET",
                url : "http://localhost:8080/"
            }).then(function onSuccess(response) {
                $scope.serverConfig = response.data;
            }, function onError(response) {
                $scope.myWelcome = response.statusText;
            });
        }
    ]
);