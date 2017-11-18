var app = angular.module('fitbitCallbackApp', ['tractdb.config']);

app.controller(
    'fitbitCallbackController',
    [
        '$scope', '$http', '$window', '$location', 'BASEURL_PYRAMID',
        function ($scope, $http, $window, $location, BASEURL_PYRAMID) {
            var callback = $location.search();
            if ('code' in callback) {
                // Post the code back to our server
                $http({
                    method: 'POST',
                    url: BASEURL_PYRAMID + '/configure/fitbit/callback_code',
                    data: {
                        'callback_code': callback['code']
                    }
                }).then(
                    // Success
                    function (response) {
                        $window.location = $location.url('/configure/fitbit').url()
                    },
                    // Failure
                    function (response) {
                        $window.alert('Something went wrong with authorization. Please contact the research team.');
                    }
                );
            }
        }
    ]
);
