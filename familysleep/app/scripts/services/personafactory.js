'use strict';

/**
 * @ngdoc service
 * @id FamilySleep.personaFactory
 * @description
 * # personaFactory
 * Factory in the FamilySleep. Contains each family member's profile pic, target hours, id, and type of family member
 */
 /* format of profiles object
{
  "data": [{
    "name": "Rob",
    "targetedHours": 9,
    "profilePic": "images/avatars/momcircle.png",
    "relation": "parent1",
    "id": "mom"
  }, {
    "name": "Pat",
    "targetedHours": 8,
    "profilePic": "images/avatars/dadcircle.png",
    "relation": "parent2",
    "id": "dad"
  }, {
    "name": "JR",
    "targetedHours": 10,
    "profilePic": "images/avatars/girlcircle.png",
    "relation": "child1",
    "id": "boy"

  }, {
    "name": "AJ",
    "targetedHours": 10,
    "profilePic": "images/avatars/boycircle.png",
    "relation": "child2",
    "id": "girl"
  }]
}

 */
angular.module('FamilySleep')
  .factory('personaFactory', ['$http', 'localStorageService', function ($http, localStorageService) {
    // Service logic
    // ...
    //array holding all the profiles, structure is set above
    var profiles = [];

    var temp_data; 

    var retrieveProfiles = function() {
      //get file for profiles and update them 
      //console.log("at persona Factory");
        return $http({method:'GET', url: 'data/persona.json' })
        .then(function (response) {
          // this callback will be called asynchronously
          // when the response is available
          temp_data = response.data;
          //console.log(temp_data);
          populate(temp_data);
          //console.log(temp_data);

          if(localStorageService.isSupported) {
            console.log('set');
            var result = localStorageService.set('auth', temp_data);
            if(result) {
              console.log('setting worked!-------------------------');
            }
            var value = localStorageService.get('auth');
            if(value != null) {
              console.log('get worked! -------');
              console.log("printing temp_data");
              console.log(value);
            }
          }



          //populate(temp_data);
        }, function (response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.error('Error' + response.statusText);
        });
    }

    var populate = function(temp_data) {
      profiles = temp_data.data;
      /*console.log("in populate part of the personaFactory");
      console.log(profiles);*/  
    }


    var getProfile = function (id) {
      for(var i = 0; i < profiles.length; i++) { 
        if(profiles[i].id == id) {
          return profiles[i];
        }
      }
    }

    var getAllProfiles = function() {
      return profiles;
    }

    var getAllIDs = function(){
      var IDArray = new Array(profiles.length);
      for(var i = 0; i < profiles.length; i++) {
          IDArray[i] = profiles[i].id;
      }
      return IDArray;
    }

    var getProfPic = function(id) {
      for(var i = 0; i < profiles.length; i++) {
        if(profiles[i].id == id) {
          return profiles[i].profilePic;
        }
      }
    }

    var getTargetedHours = function(id) {
      for(var i = 0; i < profiles.length; i++) {
        if(profiles[i].id == id) {
          return profiles[i].targetedHours;
        }
      }
    }

    var getTargetedHours = function(id) {
      for(var i = 0; i < profiles.length; i++) {
        if(profiles[i].id == id) {
          return profiles[i].targetedHours;
        }
      }
    }

    var getRelation = function(id) {
      for(var i = 0; i < profiles.length; i++) {
        if(profiles[i].id == id) {
          return profiles[i].relation;
        }
      }
    }

    var getName = function(id) {
      for(var i = 0; i < profiles.length; i++) {
        console.log(profiles[i].relation);
        if(profiles[i].relation == id) {
          return profiles[i].name;
        }
      }
    }

    var getAllNames = function(){
      var nameArray = new Array(profiles.length);
      for(var i = 0; i < profiles.length; i++) {
          //console.log(profiles[i].name);
          nameArray[i] = profiles[i].name;
      }
      //console.log("getAllNames Function");
      //console.log(nameArray);
      return nameArray;
    }

    //calling retrieveProfiles(); from here needs to go somewhere else

    retrieveProfiles();
    //console.log(profiles);
    // Public API here
    return {
      getProfPic: getProfPic,
      getTargetedHours: getTargetedHours,
      getRelation : getRelation,
      getAllProfiles : getAllProfiles,
      getProfile: getProfile,
      retrieveProfiles: retrieveProfiles,
      getName: getName,
      getAllNames: getAllNames,
      getAllIDs: getAllIDs

    };
  }]);
