'use strict';

// "personas": {
//     "m1": {
//         "name": "Rob",
//         "targetedHours": 9,
//         "profilePic": "images/avatars/momcircle.png",
//         "relation": "parent",
//         "pid": "m1",
//         "fitbit": "4KBZLY"
//     },
//     "m2": {
//         "name": "Pat",
//         "targetedHours": 8,
//         "profilePic": "images/avatars/dadcircle.png",
//         "relation": "parent",
//         "pid": "m2",
//         "fitbit": "4KB123"
//     },
//     "m3": {
//         "name": "JR",
//         "targetedHours": 10,
//         "profilePic": "images/avatars/girlcircle.png",
//         "relation": "child",
//         "pid": "m3",
//         "fitbit": "4KATL6"
//
//     },
//     "m4": {
//         "name": "AJ",
//         "targetedHours": 10,
//         "profilePic": "images/avatars/boycircle.png",
//         "relation": "child",
//         "pid": "m4",
//         "fitbit": "22TL6D"
//     }
// }

var module = angular.module(
    'FamilySleep'
)
    
module.factory(
    'personaFactory', 
    [
        '$rootScope', '$http', '$timeout', 'BASEURL_PYRAMID',
        function ($rootScope, $http, $timeout, BASEURL_PYRAMID) {
            var factory = {};

            //
            // Our personas data from the server
            //
            factory.personas = null;

            //
            // Retrieve our personas data, schedule our next retrieve
            //
            factory.retrieveData = function () {
                $http(
                    {
                        method: 'GET',
                        url: BASEURL_PYRAMID + '/document/familysleep_personas'
                    }
                ).then(function (response) {
                    factory.personas = response.data.personas;
                    factory._notify();
                }).catch(function () {

                }).finally(function () {
                    factory._scheduleNextRetrieve();
                });
            };

            //
            // Track who is listening to us, start/stop retrieval
            //
            factory._numberObservers = 0;
            factory._nextRetrievePromise = null;

            factory.observe = function (scope, callback) {
                var deregister = $rootScope.$on('personaFactory-data', callback);

                factory._numberObservers += 1;
                factory.retrieveData();

                scope.$on('$destroy', function () {
                    deregister();

                    factory._numberObservers -= 1;
                    if (factory._numberObservers == 0) {
                        $timeout.cancel(factory._nextRetrievePromise);
                        factory._nextRetrievePromise = null;
                    }
                });
            }

            factory._notify = function () {
                $rootScope.$emit('personaFactory-data');
            }

            //
            // Schedule another retrieve, if anybody is listening
            //
            factory._scheduleNextRetrieve = function () {
                $timeout.cancel(factory._nextRetrievePromise);
                if (factory._numberObservers > 0) {
                    factory._nextRetrievePromise = $timeout(factory.retrieveData, 3 * 1000);
                }
            };

            //
            // Initial retrieval
            //
            factory.retrieveData();

            return factory;
        }
    ]
);