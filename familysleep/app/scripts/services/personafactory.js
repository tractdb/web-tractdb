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

            var doc_id = null;
            var doc_rev = null;
            //
            // Our personas data from the server
            //
            factory.personas = {}; //null;

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
                    // console.log('printing response');
                    // console.log(response);
                    factory.personas = response.data.personas;
                    doc_id = response.data._id;
                    doc_rev = response.data._rev;
                    // console.log('in personaFactory retrieveData');
                    // console.log(factory.personas);
                    // console.log('doc_id');
                    // console.log(doc_id);
                    // console.log('doc_rev');
                    // console.log(doc_rev);
                    factory._notify();
                }).catch(function () {
                  //error message

                }).finally(function () {
                    //
                    factory._scheduleNextRetrieve();
                });

            }

            /*
              setting the personas data.
            */
            factory.putData = function() {
                $http(
                    {
                      method: 'GET',
                      url: BASEURL_PYRAMID + '/document/familysleep_personas'
                    }
                ).then(function success(response){
                    var old_personas = response.data.personas;
                    doc_id = response.data._id;
                    doc_rev = response.data._rev;
                    //console.log("doc_rev at GET from setData");
                    //console.log(doc_rev);
                    //factory.personas = new_personas;
                    var new_doc = {
                        "_id": doc_id,
                        "_rev": doc_rev,
                        "personas": factory.personas
                    };
                    // console.log("printing obj for PUT");
                    // console.log(new_doc);
                    //now doing the PUT
                    //embedding PUT in GET this doesn't seem the right logic
                    $http(
                        {
                            method: 'PUT',
                            url: BASEURL_PYRAMID + '/document/familysleep_personas',
                            data: new_doc
                        }
                    ).then(function success(response){
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
                    console.log("error" + response.code);
                    console.log("error text" + response.statusText);
                });
            }

            // factory.putData = function() {
            //     $http(
            //         {
            //           method: 'GET',
            //           url: BASEURL_PYRAMID + '/document/familysleep_personas'
            //         }
            //     ).then(function success(response){
            //         var old_personas = response.data.personas;
            //         doc_id = response.data._id;
            //         doc_rev = response.data._rev;
            //         //console.log("doc_rev at GET from setData");
            //         //console.log(doc_rev);
            //         //factory.personas = new_personas;
            //     }).then(function success(response){
            //         var new_doc = {
            //             "_id": doc_id,
            //             "_rev": doc_rev,
            //             "personas": factory.personas
            //         };
            //         $http(
            //             {
            //                 method: 'PUT',
            //                 url: BASEURL_PYRAMID + '/document/familysleep_personas',
            //                 data: new_doc
            //             }
            //         ).then(function success(response){
            //             doc_id = response.data._id;
            //             doc_rev = response.data._rev;
            //             //console.log("rev of the PUT");
            //             //console.log(doc_rev);
            //             factory._notify();
            //         }).catch (function errorCallback(response){
            //             console.log("error in the PUT");
            //             console.log(response.code);
            //         }).finally(function (){
            //             factory._scheduleNextRetrieve();
            //         });
            //     }).catch (function errorCallback(response){
            //         console.log("error" + response.code);
            //         console.log("error text" + response.statusText);
            //     });
            // }

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
                    //factory._nextRetrievePromise = $timeout(factory.retrieveData, 3 * 1000);
                    factory._nextRetrievePromise = $timeout(factory.retrieveData, 3 * 10000);
                }
            };

            //returns names
            factory.getAllNames = function(){
                var names = [];
                for (var prop in factory.personas){
                    //console.log(prop);
                    var name = factory.personas[prop].name;
                    //console.log(name);
                    //console.log(obj.name);
                    names.push(name);
                }
                //console.log("in getAllNames");
                //console.log(name);
                return names;
            }

            //returns an Array of key values
            factory.getAllIDs = function(){
                return Object.keys(factory.personas);
            }

            factory.getAllNameIDs = function(){
                var allMembers = {};
                //var member = [];
                angular.forEach(factory.personas, function (value, key){
                    allMembers[key] = {name: value.name};
                    // member = [key, value.name];
                    // allMembers.push(member);
                })
                
            }

            factory.getID = function(name){
                var id;
                for(var fam in factory.personas){
                    if (fam.name == name){
                        id = fam.pid;
                        return id;
                    }
                }
                return null;
            }

            /***TODO: the  thing below is temporary, needs to fit into the signup pipeline****/
            //
            // Initial retrieval
            //
            //factory.retrieveData();
            

            return factory;
        }
    ]
);
