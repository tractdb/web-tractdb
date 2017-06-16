var app = angular.module('loginApp', ['tractdb.config']);

app.controller(
    'loginController',
    [
        '$scope', '$http', '$location', '$window', 'BASEURL_PYRAMID',
        function ($scope, $http, $location, $window, BASEURL_PYRAMID) {
            $scope.viewModel = {};
            $scope.viewModel.account = '';
            $scope.viewModel.password = '';

            $scope.submitLoginForm = function () {
                $http({
                    method: 'POST',
                    url: BASEURL_PYRAMID + '/login',
                    data: {
                        'account': $scope.viewModel.account,
                        'password': $scope.viewModel.password
                    }
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
