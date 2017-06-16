var app = angular.module('loginApp', ['tractdb.config']);

app.controller(
    'loginController',
    [
        '$scope', '$http', '$location', '$window', 'BASEURL_PYRAMID',
        function ($scope, $http, $location, $window, BASEURL_PYRAMID) {
            // TODO: stylistically, this 'bag of parameters' seems bad
            $scope.viewModel = {};
            $scope.submitLoginForm = function () {
                $http({
                    method: 'POST',
                    url: BASEURL_PYRAMID + '/login',
                    headers: {'Content-Type': 'application/json'},
                    data: $scope.viewModel // pass in data as JSON
                }).then(
                    // successful response
                    function (response) {
                        $window.location = $location.url('/profile').url()
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
