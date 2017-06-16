var app = angular.module('registerApp', ['tractdb.config']);

app.controller(
    'registerController',
    [
        '$scope', '$http', '$location', '$window', 'BASEURL_PYRAMID',
        function ($scope, $http, $location, $window, BASEURL_PYRAMID) {
            // TODO: stylistically, this 'bag of parameters' seems bad
            $scope.viewModel = {};
            $scope.submitRegisterForm = function () {
                $http({
                    method: 'POST',
                    url: BASEURL_PYRAMID + '/accounts',
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
            };
        }
    ]
);
