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

            
            factory.audio = {}; // audio: {'data': audio, 'endtimeStamp': new Date(), 'users': users};
            factory.users = [];
            factory.prompt = {};
            factory.promptId = {};
            factory.startTime = {};
            

            /*
              setting the recorder data.
            */

            factory.putData = function() {

                
                var date_format = moment(factory.audio.endtimeStamp).format('YYYY_MM_DD_kk_mm_ss');

                //var date_format = moment(factory.startTime).format('YYYY_MM_DD_kk_mm');

                var date_time =  moment(factory.audio.endtimeStamp).format('YYYY/MM/DD_kk:mm');
                //var date_time = factory.startTime;
                
                var doc_id = 'audio_logs' + '_' + date_format;
                var doc_rev;
                var new_doc = {
                    "users": factory.audio.users || "",
                    "promptId": factory.promptId || "",
                    "prompt": factory.prompt || "",
                    "endTimeStamp": date_time
                }
                $http(  
                {
                    method: 'POST',
                    url: BASEURL_PYRAMID + '/document/' + doc_id,
                    data: new_doc
                }).then(function success(response){
                    doc_rev = response.data._rev;
                    //could null users
                    //factory.audio.users = null;
                    $http(  
                    {
                        method: 'POST',
                        url: BASEURL_PYRAMID +'/document/' + doc_id + '/attachment/' + date_format,
                        headers: {'Content-Type': factory.audio.data.type},
                        params: {'rev': doc_rev},
                        data: factory.audio.data
                    }).then(function success(response){
                        console.log('success at attaching audio log');
                        factory.audio = {}; // audio: {'data': audio, 'endtimeStamp': new Date(), 'users': users};
                        factory.users = [];
                        factory.prompt = {};
                        factory.promptId = {};
                        factory.startTime = {};
                        factory.source = {};
                    }).catch(function errorCallback(response){
                        console.log("error in the PUT");
                        console.log(response);
                        console.log(response.status);
                    });
                }).catch (function errorCallback(response){
                    console.log("error in the PUT");
                    console.log(response.status);
                });
            }

            return factory;
        }
    ]
);
