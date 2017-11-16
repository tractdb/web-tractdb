'use strict';

var module = angular.module(
    'FamilySleep'
)
    
module.factory(
    'recorderFactory', 
    [
        '$rootScope', '$http', '$timeout', 'BASEURL_PYRAMID',
        function ($rootScope, $http, $timeout, BASEURL_PYRAMID) {
            var factory = {};

            var doc_id = null;
            var doc_rev = null;

            factory.audio = {}; // audio: {'data': audio, 'timeStamp': new Date(), 'users': users};
            factory.users = [];

            /*
              setting the recorder data.
            */
            factory.putData = function() {
                $http(
                    {
                      method: 'GET',
                      url: BASEURL_PYRAMID + '/document/familysleep_audio_recording'
                    }
                ).then(function success(response){
                    var old_audios = response.data.audios;
                    // what happens if it doesn't exist??
                    doc_id = response.data._id;
                    doc_rev = response.data._rev;
                    var new_audios;
                    if(old_audios == []) {
                        new_audios = [factory.audio];
                    } else {
                        new_audios = old_audios.push(facctory.audio);
                    }
                    var new_doc = {
                        "_id": doc_id,
                        "_rev": doc_rev,
                        "audios": new_audios
                    };
                    $http(
                        {
                            method: 'PUT',
                            url: BASEURL_PYRAMID + '/document/familysleep_audio_recording',
                            data: new_doc
                        }
                    ).then(function success(response){
                        doc_id = response.data._id;
                        doc_rev = response.data._rev;
                        //console.log("rev of the PUT");
                        //console.log(doc_rev);
                    }).catch (function errorCallback(response){
                        console.log("error in the PUT");
                        console.log(response.code);
                    }).finally(function (){
                        
                    });
                }).catch (function errorCallback(response){
                    console.log("error in recorderFactory in GET");
                    console.log("error" + response.code);
                    console.log("error text" + response.statusText);
                });
            }

            return factory;
        }
    ]
);
