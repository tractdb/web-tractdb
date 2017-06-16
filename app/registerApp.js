var app = angular.module('registerApp', ['tractdb.config']);

app.controller(
    'registerController',
    [
        '$scope', '$http', '$location', '$window', 'BASEURL_PYRAMID',
        function ($scope, $http, $location, $window, BASEURL_PYRAMID) {
            $scope.viewModel = {};
            $scope.viewModel.account = '';
            $scope.viewModel.password = '';
            $scope.viewModel.confirmPassword = '';

            $scope.submitRegisterForm = function () {
                $http({
                    method: 'POST',
                    url: BASEURL_PYRAMID + '/accounts',
                    headers: {'Content-Type': 'application/json'},
                    data: {
                        'account': $scope.viewModel.account,
                        'password': $scope.viewModel.password,
                        'confirmPassword': $scope.viewModel.confirmPassword
                    }
                }).then(
                    function () {
                        return $http({
                            method: 'POST',
                            url: BASEURL_PYRAMID + '/login',
                            data: {
                                'account': $scope.viewModel.account,
                                'password': $scope.viewModel.password
                            }
                        })
                    }
                ).then(
                    // Success
                    function (response) {
                        $window.location = $location.url('/profile').url()
                    }
                ).catch(
                    // Failure
                    function (response) {
                        window.alert('Invalid account or password.');
                    }
                );
            };
        }
    ]
);
