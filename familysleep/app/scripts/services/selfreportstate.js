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
 */
 /*TODO: the object needs to be initialized in the same way that the query for sleep needs to happen outside from FDV controller***/
 /***TODO: need to figure out how to make the object as know how many families OR to have an object with four fields? **/
angular.module('FamilySleep')
  .factory('selfReportState', ['dateFactory', 'personaFactory', function (dateFactory, personaFactory) {
    var states = {};

    //NEED TO UPDATE THIS
    /*var states =  {
        date: "2016-05-3",
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
        m3: {
            state: false,
            mood: null,
            image: null
        }
    };*/

    /*var states =  {
        mom: {
            state: false,
            mood: null,
            image: null
        },
        dad: {
            state: false,
            mood: null,
            image: null
        },
        child1: {
            state:false,
            mood: null,
            image: null
        },
        child2: {
            state: false,
            mood: null,
            image: null
        }
    };*/

    var intializeAll = function (pids){
        for (var i = pids.length - 1; i >= 0; i--) {
            var id = pids[i];
            states[id].state = false;
            states[id].mood = null;
            states[id].image = null;
        }
        console.log("in initializeAll selfReportState");
        console.log(states);
    }

    var initializeSingle = function(id){
        states[id] = {};
        states[id]['state'] = false;
        states[id]['mood'] = null;
        states[id]['image'] = null;
        /*console.log("in initializeSingle selfReportState");
        console.log(states);*/
    }

    var getAllMoods = function(){
        return states;
    }

    var setMood = function(id, mood, image){
        if(states.hasOwnProperty(id)){
            states[id].mood = mood;
            states[id].image = image;
            states[id].state = true;
        }
    }

    var clearAll = function(){
        for (var prop in states) {
            if (obj.hasOwnProperty(prop)) {
                delete obj[prop];
            }
        }   
    }

    return {
        intializeAll: intializeAll,
        initializeSingle: initializeSingle,
        getAllMoods: getAllMoods,
        setMood: setMood,
        clearAll: clearAll
    }
}]);
