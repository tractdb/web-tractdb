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
    var states =  {
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
    };  

    return states;
/*
    var states = {};
    this.intialize = function(){
        var d = personaFactory.getDateString();
        var 
    }

    var getStates = function(){
        return states;
    }

    this.intialize();
    return {
        getStates: getStates
    };
    */
}]);
