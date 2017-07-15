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
                image: null
            },
            m2: {
                state: false,
                mood: null,
                image: null
            },
            m3: {
                state:false,
                mood: null,
                image: null
            },
            m4: {
                state: false,
                mood: null,
                image: null
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
 */
angular.module('FamilySleep')
  .factory('selfReportState', ['dateFactory', 'personaFactory', function (dateFactory, personaFactory) {
    var factory = {};
    factory.states = {};

    /*factory.retrieveData = function () {
        $http(
            {
                method: 'GET',
                url: BASEURL_PYRAMID + '/document/familysleep_personas'
            }
        ).then(function (response) {
            factory.personas = response.data.personas;
            doc_id = response.data._id;
            doc_rev = response.data._rev;
            factory._notify();
        }).catch(function () {
          //error message

        }).finally(function () {
            //
            factory._scheduleNextRetrieve();
        });
    };*/

    factory.intializeAll = function (pids){
        var d = dateFactory.getDateString();
        var temp = {};
        for (var i = pids.length - 1; i >= 0; i--) {
            var id = pids[i];
            temp[id] = {};
            temp[id]['state'] = false;
            temp[id]['mood'] = null;
            temp[id]['image'] = null;
        }
        factory.states[d] = temp;
        console.log("in initializeAll selfReportState");
        console.log(factory.states);
    }

    //todo: this is incorrect
    /*
    factory.initializeSingle = function(id){
        factory.states[id] = {};
        factory.states[id]['state'] = false;
        factory.states[id]['mood'] = null;
        factory.states[id]['image'] = null;
        /*console.log("in initializeSingle selfReportState");
        console.log(factory.states);
    }*/

    factory.getAllMoods = function(){
        return factory.states;
    }

    factory.setMood = function(id, mood, image){
        if(factory.states.hasOwnProperty(id)){
            factory.states[id].mood = mood;
            factory.states[id].image = image;
            factory.states[id].state = true;
        }
    }

    factory.clearAll = function(){
        for (var prop in factory.states) {
            if (obj.hasOwnProperty(prop)) {
                delete obj[prop];
            }
        }   
    }

  
    /*return {
        intializeAll: intializeAll,
        initializeSingle: initializeSingle,
        getAllMoods: getAllMoods,
        setMood: setMood,
        clearAll: clearAll
    }*/
    return factory;
}]);
