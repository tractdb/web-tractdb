  'use strict';

/**
 * @ngdoc service
 * @name FamilySleep.sleepDataService
 * @description:
 * I think we need to have data with the following structure.
 * sleepDataService or Object with Arrays where:
 * 
 [{
	name:
	fitbitID:
	s_data: //which is a json piece of 
	date: //we need to keep track of date in case they want to view other dates
 }
 ]
 * # sleepDataService
 * Service in the FamilySleep.
 */
 //just need to pass the name around to the controllers
angular.module('FamilySleep')
  .service('sleepDataService', function () { //apparently these functions can have names!
  	//function() is like a constructor and slepDataService is an instance
    // AngularJS will instantiate a singleton by calling "new" on this function

    //this is for scoping issues
    var sleepDataService = this; //haven't figured out this cope thing
    sleepDataService.dbdata = {};

    //this.getData
    //this.setData
  });
