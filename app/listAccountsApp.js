var app = angular.module('listAccountsApp', ['tractdb.config']);

app.controller(
    'listAccountsController',
    [
        '$scope', '$http', 'BASEURL_PYRAMID',
        function ($scope, $http, BASEURL_PYRAMID) {
            $http({
                method: 'GET',
                url: BASEURL_PYRAMID + '/accounts',
                headers: {'Content-Type': 'application/json'},
                data: $scope.viewModel
            }).then(function onSuccess(response) {
                $scope.accounts = response.data;
            }, function onError(response) {
                $scope.error = response.statusText;
            });
        }
    ]
);
