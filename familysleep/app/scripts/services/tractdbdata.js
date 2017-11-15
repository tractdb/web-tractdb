'use strict';

var module = angular.module(
    'FamilySleep'
)

module.factory(
    'tractdbFactory',
    [
        '$rootScope', '$http', '$timeout', 'BASEURL_PYRAMID',
        function ($rootScope, $http, $timeout, BASEURL_PYRAMID) {
            var factory = {};

            //
            // Our data from the server
            //
            factory.tractdbData = null;

            //
            // What data we want from the server
            //
            factory._query = null;       // 'familydaily', 'familyweekly', 'singledaily', 'singleweekly'
            factory._queryPid = null;
            factory._queryDate = null;

            factory.setQuery = function(query, queryPid, queryDate) {
                var modified = false;
                if (factory._query != query) {
                    modified = true;
                    factory._query = query;
                }
                if (factory._queryPid != queryPid) {
                    modified = true;
                    factory._queryPid = queryPid;
                }
                if (factory._queryDate != queryDate) {
                    modified = true;
                    factory._queryDate = queryDate;
                }

                if (modified) {
                    factory.tractdbData = null;
                    factory.retrieveData();
                }
                // console.log('printing query');
                // console.log(factory._query);
            };

            //
            // Retrieve our data, schedule our next retrieve
            //
            factory.retrieveData = function () {
                var get = null;
                if(factory._query == 'familydaily' && factory._queryDate) {
                    get = {
                        method: 'GET',
                        url: BASEURL_PYRAMID + '/familysleep/familydaily/' + factory._queryDate
                    };
                } else if (factory._query == 'familyweekly' && factory._queryDate){
                    get = {
                        method: 'GET',
                        url: BASEURL_PYRAMID + '/familysleep/familyweekly/' + factory._queryDate
                    };
                } else if (factory._query == 'singledaily' && factory._queryDate && factory._queryPid){
                    get = {
                        method: 'GET',
                        url: BASEURL_PYRAMID + '/familysleep/singledaily/' + factory._queryPid + '/' + factory._queryDate
                    };
                } else if (factory._query == 'singleweekly' && factory._queryDate && factory._queryPid){
                    get = {
                        method: 'GET',
                        url: BASEURL_PYRAMID + '/familysleep/singleweekly/' + factory._queryPid + '/' + factory._queryDate
                    };
                    // console.log("in get");
                    // console.log(get);
                }
                else {
                    console.log('tractdbFactory lacks valid query.');
                }

                if (get) {
                    $http(
                        get
                    ).then(function (response) {
                        factory.tractdbData = response.data;
                        factory._notify();
                    }).catch(function (response) {
                        //can catch error here
                        console.log("error from tractdbdata");
                        console.log(response.code);
                        console.log(response.statusText);
                    }).finally(function () {
                        //factory._scheduleNextRetrieve();
                    });
                }
            };

            //
            // Track who is listening to us, start/stop retrieval
            //
            factory._numberObservers = 0;
            factory._nextRetrievePromise = null;

            factory.observe = function (scope, callback) {
                var deregister = $rootScope.$on('tractdbFactory-data', callback);

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
            };

            factory._notify = function () {
                $rootScope.$emit('tractdbFactory-data');
            };

            //
            // Schedule another retrieve, if anybody is listening
            //
            factory._scheduleNextRetrieve = function () {
                $timeout.cancel(factory._nextRetrievePromise);
                if (factory._numberObservers > 0) {
                    //factory._nextRetrievePromise = $timeout(factory.retrieveData, 3 * 1000);
                    factory._nextRetrievePromise = $timeout(factory.retrieveData, 3 * 10000);
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