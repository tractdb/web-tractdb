var app = angular.module('profileApp', ['tractdb.config']);

app.controller(
    'profileController',
    [
        '$scope', '$http', 'BASEURL_PYRAMID',
        function ($scope, $http, BASEURL_PYRAMID) {
            $scope.viewModel = {}
            $scope.viewModel.account = ''

            $http({
                method: 'GET',
                url: BASEURL_PYRAMID + '/authenticated'
            }).then(
                // successful response
                function (response) {
                    $scope.viewModel.account = response.data.account;
                },
                // error response
                function (response) {
                    window.alert('Invalid account or password.');
                }
            );
        }
    ]
);
