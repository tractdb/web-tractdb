var app = angular.module('serverConfigApp', ['tractdb.config']);

app.controller(
    'serverConfigController',
    [
        '$scope', '$http', 'BASEURL_PYRAMID',
        function($scope, $http, BASEURL_PYRAMID) {
            $http({
                method : 'GET',
                url : BASEURL_PYRAMID
            }).then(function onSuccess(response) {
                $scope.serverConfig = response.data;
            }, function onError(response) {
                $scope.myWelcome = response.statusText;
            });
        }
    ]
);
