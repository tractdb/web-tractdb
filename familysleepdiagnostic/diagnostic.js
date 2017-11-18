var app = angular.module('familySleepDiagnosticApp', ['tractdb.config']);

app.controller(
    'familySleepDiagnosticController',
    [
        '$scope', '$http', 'BASEURL_PYRAMID',
        function ($scope, $http, BASEURL_PYRAMID) {
            $http({
                method: 'GET',
                url: BASEURL_PYRAMID,
                headers: {'Content-Type': 'application/json'},
                data: ''
            }).then(function onSuccess(response) {
                $scope.serverConfig = JSON.stringify(response.data, undefined, 2);
            }, function onError(response) {
            });

            $http({
                method: 'GET',
                url: BASEURL_PYRAMID + '/document/familysleep_personas',
                headers: {'Content-Type': 'application/json'},
                data: ''
            }).then(function onSuccess(response) {
                $scope.personas = JSON.stringify(response.data, undefined, 2);
            }, function onError(response) {
            });

            $http({
                method: 'GET',
                url: BASEURL_PYRAMID + '/document/fitbit_tokens',
                headers: {'Content-Type': 'application/json'},
                data: ''
            }).then(function onSuccess(response) {
                $scope.fitbitTokens = JSON.stringify(response.data, undefined, 2);
            }, function onError(response) {
            });
        }
    ]
);
