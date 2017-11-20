var app = angular.module('fitbitConfigureApp', ['tractdb.config']);

app.controller(
    'fitbitConfigureController',
    [
        '$scope', '$http', 'BASEURL_PYRAMID',
        function ($scope, $http, BASEURL_PYRAMID) {
            $scope.fitbitTokens = JSON.stringify({}, undefined, 2);
            $scope.fitbitDevices = [];

            $http({
                method: 'GET',
                url: BASEURL_PYRAMID + '/document/fitbit_tokens',
                headers: {'Content-Type': 'application/json'},
                data: ''
            }).then(function onSuccess(response) {
                $scope.fitbitTokens = JSON.stringify(response.data, undefined, 2);

                response.data.fitbit_tokens.forEach(function(tokenCurrent) {
                    $scope.fitbitDevices.push(tokenCurrent.user_id);
                });
            }, function onError(response) {
            });
        }
    ]
);
