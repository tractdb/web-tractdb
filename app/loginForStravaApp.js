var app = angular.module('loginForStravaApp', ['tractdb.config']);

app.controller(
    'loginForStravaController',
    [
        '$scope', '$http', '$window', 'BASEURL_PYRAMID',
        function ($scope, $http, $window, BASEURL_PYRAMID) {
            // TODO: stylistically, this 'bag of parameters' seems bad
            $scope.viewModel = {};
            $scope.submitLoginForm = function () {
                $http({
                    method: 'POST',
                    url: BASEURL_PYRAMID + '/login',
                    headers: {'Content-Type': 'application/json'},
                    data: $scope.viewModel // pass in data as JSON
                }).then(
                    function (response) {
                        console.log('login success response: ' + response);
                        $window.alert('Successfully logged in!');
                        $window.location = "https://www.strava.com/oauth/authorize?client_id=16227&response_type=code&redirect_uri=https%3A%2F%2Ftractdb.org%2Fconfigure%2Fstrava%2Fcallback&approval_prompt=force"
                    },
                    function (response) {
                        console.log('login error response: ' + response);
                        $window.alert('Invalid username or password.');
                    }
                );
            }
        }
    ]
);
