var app = angular.module('fitbitCallbackApp', ['tractdb.config']);

app.controller(
    'fitbitCallbackController',
    [
        '$scope', '$http', '$window', '$location', 'BASEURL_PYRAMID',
        function ($scope, $http, $window, $location, BASEURL_PYRAMID) {
            var callback = $location.search();
            if ('code' in callback) {
                var rev = null;

                // Check to see if there's an existing code document
                $http({
                    method: 'GET',
                    url: BASEURL_PYRAMID + '/document/fitbit_callback_code'
                }).then(
                    function (response) {
                        rev = response.data['_rev']
                    },
                    function (response) {

                    }
                ).then(
                    // Delete any existing code document
                    function () {
                        if (rev) {
                            return $http({
                                method: 'DELETE',
                                url: BASEURL_PYRAMID + '/document/fitbit_callback_code',
                                params: {
                                    'rev': rev
                                }
                            });
                        }
                    }
                ).then(
                    // Post the current code
                    function () {
                        return $http({
                            method: 'POST',
                            url: BASEURL_PYRAMID + '/document/fitbit_callback_code',
                            data: {
                                'callback_code': callback['code']
                            }
                        });
                    }
                ).then(
                    // Success
                    function (response) {
                        $window.location = $location.url('/profile').url()
                    }
                ).catch(
                    // Failure
                    function (response) {
                        $window.alert('Something went wrong with authorization. Please contact the research team.');
                    }
                );
            }
        }
    ]
);
