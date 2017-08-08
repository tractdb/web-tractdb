'use strict';

/**
 * @ngdoc service
 * @name FamilySleep.selfReportState
 * @description
 * # selfReportState
 * Factory in the FamilySleep.
 * Returning an empty factory
 */
 /* Description:
    Structure of the information contained in this factory
    var factory.states =  {
        2016-05-3: {
            m1: {
                state: false,
                mood: null,
                image: null.
                reporter: null
            },
            m2: {
                state: false,
                mood: null,
                image: null,
                reporter: null
            },
            m3: {
                state:false,
                mood: null,
                image: null,
                reporter: null
            },
            m4: {
                state: false,
                mood: null,
                image: null,
                reporter: null
            }
        }
    };

This object is created when as family members sign up.
Description of each property:
    date -> date that these moods correspond to
            each family members starts with family id (e.g., m1, m2, m3, m4)
    state -> Value: T/F (binary) this is were we know if mood has been reported or not
    mood -> String -- describing the mood reported (null/String)
    image -> png of reported mood (null/png)
might get rid of state and directly use mood (String) to identify if it has been set.
    reporter -> who self-reported mood
 */
 /*
    TODO: 
 */
angular.module('FamilySleep')
  .factory('selfReportState', ['dateFactory', 'personaFactory', 'BASEURL_PYRAMID', '$rootScope', '$http', '$timeout', function (dateFactory, personaFactory, BASEURL_PYRAMID, $rootScope, $http, $timeout ) {
    var factory = {};
    factory.states = {};

    var doc_rev = null;
    var doc_id = null;

    factory.retrieveData = function () {
        var date = dateFactory.getDateString();
        var url = BASEURL_PYRAMID + '/document/family_selfreport_' + date;
        console.log('printing ulr string');
        console.log(url);
        $http(
            {
                method: 'GET',
                url: url
            }
        ).then(function (response) {
            var states = response.data.states;
            console.log(states)
            var date = dateFactory.getDateString;
            factory.states = states;

            doc_id = response.data._id;
            doc_rev = response.data._rev;
            factory._notify();
        }).catch(function () {
          //error message

        }).finally(function () {
            //
            factory._scheduleNextRetrieve();
        });
    };

    factory.putNewData = function(){
        var date = dateFactory.getDateString();
        var url = BASEURL_PYRAMID + '/document/family_selfreport_' + date;
        $http(
            {
            method: 'GET',
            url: url
            }
        ).then(function success(response){
            console.log('printing reponse in putData of selfReportState');
            console.log(response);
            doc_id = response.data._id;
            doc_rev = response.data._rev;
            var old_states = response.states;
            //console.log("doc_rev at GET from setData");
            //console.log(doc_rev);
            //factory.personas = new_personas;
            var new_doc = {
            "_id": doc_id,
            "_rev": doc_rev,
            "states": factory.states
            };
            // console.log("printing obj for PUT");
            // console.log(new_doc);
            //now doing the PUT
            //embedding PUT in GET this doesn't seem the right logic
            url = BASEURL_PYRAMID + '/document/family_selfreport_' + date;
            $http({
                method: 'PUT',
                url: url,
                data: new_doc
            }).then(function success(response){
                doc_id = response.data._id;
                doc_rev = response.data._rev;
                //console.log("rev of the PUT");
                //console.log(doc_rev);
                factory._notify();
            }).catch (function errorCallback(response){ 
                console.log("error in the PUT");
                console.log(response.code);
            }).finally(function (){
                factory._scheduleNextRetrieve();
            });
        }).catch (function errorCallback(response){
            console.log(response);
            console.log("error " + response.code);
            console.log("error text" + response.statusText);
            if(response.status == 404){
                url = BASEURL_PYRAMID + '/document/family_selfreport_' + date;
                var new_doc = {
                    "states": factory.states,
                    "_id": 'family_selfreport_' + date
                }
                $http({
                    method: 'PUT',
                    url: url,
                    data: new_doc
                }).then(function success(response){
                    doc_id = response.data._id;
                    doc_rev = response.data._rev;
                    //console.log("rev of the PUT");
                    //console.log(doc_rev);
                    factory._notify();
                }).catch (function errorCallback(response){
                    console.log("error in the PUT");
                    console.log(response);
                    console.log(response.code);
                }).finally(function (){
                    factory._scheduleNextRetrieve();
                });
            }
        });
    }

    factory.putData = function(){
        var date = dateFactory.getDateString();
        var url = BASEURL_PYRAMID + '/document/family_selfreport_' + date;
        var new_doc = {
            "_id": doc_id,
            "_rev": doc_rev,
            "states": factory.states
        };
        $http({
            method: 'PUT',
            url: url,
            data: new_doc
        }).then(function success(response){
            //doc_id = response.data._id;
            doc_rev = response.data._rev;
            //console.log("rev of the PUT");
            //console.log(doc_rev);
            factory._notify();
        }).catch (function errorCallback(response){ 
            console.log("error in the PUT");
            console.log(response.code);
        }).finally(function (){
            factory._scheduleNextRetrieve();
        });
    }
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
        $rootScope.$emit('selfReportState-data');
    }

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

    factory.initializeAll = function (pids){
        var d = dateFactory.getDateString();
        var temp = {};
        for (var i = pids.length - 1; i >= 0; i--) {
            var id = pids[i];
            temp[id] = {};
            temp[id]['state'] = false;
            temp[id]['mood'] = null;
            temp[id]['image'] = null;
            temp[id]['reporter'] = null;
        }
        factory.states[d] = temp;
        //console.log("in initializeAll selfReportState");
        //console.log(factory.states);
    }

    factory.getDate = function(){
        //returning the root key that represents date of self-report
        var d = Object.keys(factory.states)[0]; 
        return d;
    }
    //todo: this is incorrect
    
    factory.initializeSingle = function(id){
        var d = dateFactory.getDateString();
        var temp = {};
        temp[id] = {};
        temp[id]['state'] = false;
        temp[id]['mood'] = null;
        temp[id]['image'] = null;
        temp[id]['reporter'] = null;
        factory.states[d] = temp;
        // console.log("in initializeSingle selfReportState");
        // console.log(factory.states);
    }

    factory.getAllMoods = function(){
        var d = factory.getDate();
        //console.log("printing moods based on date");
        //console.log (factory.states[d]);
        return factory.states[d];
    }

    factory.getMood = function(id){
        var d = factory.getDate();
        return factory.states[d][id];
    }

    factory.setMood = function(id, mood, image, reporter, date){
        var d = factory.getDate();
        //var reportId = personaFactory.getID(reporter);
        // console.log('in set mood');
        // console.log('d = ' + d);
        // console.log('date = ' + date);
        // console.log('hasOwnProperty = ' + factory.states.hasOwnProperty(date));
        if(d == date){
            console.log('dates are the same');
            var moods = factory.getAllMoods();
            if(moods.hasOwnProperty(id)){
                moods[id].mood = mood;
                moods[id].image = image;
                moods[id].state = true;
                moods[id].reporter = reporter;
                //factory.states[id] = moods[id];
                // console.log("mood of " + id + " has been updated");
                // console.log(factory.states[d][id]);
                // console.log('entire state');
                // console.log(factory.states);
            }
        } else {
            console.log('dates are different');
        }

    }

    /*TODO: THIS IS INCORRECT
    */
    /*
    factory.clearAll = function(){
        for (var prop in factory.states) {
            if (obj.hasOwnProperty(prop)) {
                delete obj[prop];
            }
        }   
    }*/


    /*return {
        intializeAll: intializeAll,
        initializeSingle: initializeSingle,
        getAllMoods: getAllMoods,
        setMood: setMood,
        clearAll: clearAll
    }*/
    return factory;
}]);
