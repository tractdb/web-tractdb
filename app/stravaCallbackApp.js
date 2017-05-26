var app = angular.module('stravaCallbackApp', ['tractdb.config']);

app.controller(
    'stravaCallbackController',
    [
        '$scope', '$http', '$window', '$location', 'BASEURL_PYRAMID',
        function ($scope, $http, $window, $location, BASEURL_PYRAMID) {
            // TODO: stylistically, this 'bag of parameters' seems bad
            $scope.viewModel = {};
            $scope.submitCode = function () {
                console.log($location.search());
                if('code' in $location.search()) {
                    $http({
                        method: 'POST',
                        url: BASEURL_PYRAMID + '/storytelling/strava/access_token/' + $location.search()['code'],
                        headers: {'Content-Type': 'application/json'},
                        data: $scope.viewModel // pass in data as JSON
                    }).then(
                        function (response) {
                            console.log('access token success response: ' + response);
                            $window.alert('Stored the token!');
                            $window.location = "/configure/strava/complete";
                        },
                        function (response) {
                            console.log('access token error response: ' + response);
                            $window.alert('Something went wrong with the key exchange. Please contact the research team.');
                        }
                    );
                } else {
                    $window.alert('No code provided, please contact the research team.');
                }
            }
        }
    ]
);
