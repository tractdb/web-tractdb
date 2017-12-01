'use strict';

/**
 * @ngdoc service
 * @name FamilySleep.viewLogs
 * @description
 * # viewLogs
 * Factory in the FamilySleep.
 This will keep track of logs across the app
 */

         /*
                logSession = {
                        'pages' : [
                                {'page' : '', id : '', date' : },
                                {},
                        ],
                        'sessionTimeStamps': [],
                        'users' : [],
                        'startTime': ,
                        'endTime':
                }
                logs = {
                        startTime : {
                                'users' : [],
                                'timeStamp': {
                                        'startTime': ,
                                        'endTime':
                                }
                                'pages' : [
                                        {'page' : '', id : '', 'date' : },
                                        {},
                                ]
                        },
                        ...
                }
                */

var module = angular.module(
        'FamilySleep'
)
        
module.factory(
    'viewLogs', 
    ['$timeout', '$uibModal', 'personaFactory', '$log', '$rootScope', 'recorderFactory', '$http', 'BASEURL_PYRAMID', function ($timeout, $uibModal, personaFactory, $log, $rootScope, recorderFactory, $http, BASEURL_PYRAMID) {
        var factory = {};

        factory.logs = {};
        factory.logSession = null;
        factory.doc_id = null;
        factory.doc_rev = null;
        factory.counter = 1;

        factory.logLastPage = function (currentTime) {
            if(factory.logSession.sessionTimeStamps[factory.logSession.pages.length-1] == currentTime) {
                // sending audio data when user forget to stop recording.
                // if($rootScope.recordRecording || $rootScope.recordPausing) {
                //     $rootScope.onStopRecord();
                // }   
                factory.logs[factory.logSession.startTime] = {
                        'users' : factory.logSession.users,
                        'timeStamp': {
                                'startTime': factory.logSession.startTime,
                                'endTime': currentTime
                        },
                        'pages' : factory.logSession.pages
                }
                factory.putData();
                factory.logSession = null;
            }
        }

        // factory.putData = function(){
        //     var new_doc;
        //     var date_format = moment(factory.logSession.startTime).format('YYYY_MM_DD_kk_mm');
        //     console.log(factory.logSession.startTime.getFullYear());
        //     //var url = BASEURL_PYRAMID + '/document/viewLogs/' + factory.logSession.startTime;
        //     var url = BASEURL_PYRAMID + '/document/viewLogs/' + date_format;
        //     // BASEURL_PYRAMID + '/document/viewLogs'
        //     $http(
        //         {
        //             method: 'GET',
        //             url: BASEURL_PYRAMID + '/document/viewLogs/' + date_format
        //         }
        //     ).then (
        //         function success (response){
        //             factory.doc_id = "viewLogs" + factory.counter.toString();
        //             factory.counter++;
        //             factory.doc_rev = response.data._rev;
        //             new_doc = {
        //                 "_id": factory.doc_id,
        //                 "rev": factory.doc_rev,
        //                 "viewLogs": factory.logs
        //             };
        //         },
        //         function error(response){
        //             new_doc = {
        //                 "_id": "viewLogs1",
        //                 "viewLogs": factory.logs
        //             };
        //             factory.counter++;
        //         }
        //     ).then(
        //         function(){
        //             return $http({
        //                 method: 'PUT',
        //                 url: BASEURL_PYRAMID + '/document/viewLogs/' + date_format,
        //                 data: new_doc
        //             })
        //         }
        //     ).then (function success(response){
        //         factory.doc_id = response.data._id;
        //         factory.doc_rev = response.data._rev;
        //     }).catch (function error (response){
        //         console.log("error in PUT");
        //         console.log(response.status);
        //         //if error schedule next put?
        //     });
        // }

        factory.putData = function(){

            var new_doc = {
                "_id" : "viewLogs" + factory.counter.toString(),
                "viewLogs": factory.logs
            };
            var date_format = moment(factory.logSession.startTime).format('YYYY_MM_DD_kk_mm');
            
            // BASEURL_PYRAMID + '/document/viewLogs'
            $http(
                {
                    method: 'PUT',
                    url: BASEURL_PYRAMID + '/document/viewLogs' + date_format,
                    data: new_doc
                }
            ).then (function success (response){
                //factory.doc_id = "viewLogs" + factory.counter.toString();
                factory.counter++;
                //factory.doc_rev = response.data._rev;
            }).catch (function error (response){
                console.log("error in PUT");
                console.log(response.status);
                //if error schedule next put?
            });
        }

        // factory.putNewData = function(){
        //     var new_doc = {
        //         "_id": "viewLogs",
        //         "viewLogs": factory.logs
        //     };
        //     var url = BASEURL_PYRAMID + '/document/viewLogs/' + factory.logSession.startTime;
        //     $http(
        //         {
        //             method: 'PUT',
        //             url: url,
        //             data: new_doc
        //         }
        //     ).then (function success(response){
        //         // factory.doc_id = response.data._id;
        //         // factory.doc_rev = response.data._rev;
        //     }).catch (function error (response){
        //         console.log("error in PUT");
        //         console.log(response.status);
        //         //if error schedule next put?
        //     });
        // }

        /*
            if logSession is null: (start session)
                    initialize logSession = {};
                    logSession.startTime = date;
                    logSession.pages.add({page, date})
    
            else 

            start x min timer, once times up:
                    check with session to see if date == logSession.page.last.date
                    if different, means user clicked after this, we don't do anything
                    if same, means user haven't clicked for 2 mins. we treat it as the last click"  
                            save last click,
                            save the whole thing to logs.
        */

        // id=null

        factory.logPage = function (page, date, id) { 
            if (typeof(id)==='undefined') id = null;
            var currentTime = new Date();

            if (factory.logSession == null) {
                factory.logSession = {
                        'pages': [],
                        'sessionTimeStamps': [],
                        'users' : [],
                        'startTime': null,
                        'endTime': null
                };
                factory.logSession.startTime = currentTime;  
                $timeout(factory.popup, 5 * 1000); 
            }
            factory.logSession.pages.push({'page': page, 'id' : id, 'date': date});
            factory.logSession.sessionTimeStamps.push(currentTime);
            $timeout(factory.logLastPage, 3 * 10000, true, currentTime); //changed to 30 seconds wait before logging interaction
        }

        factory.popup = function() {
            factory.famMems = personaFactory.getAllNames();
            factory.famIDs = personaFactory.getAllIDs();
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/views/templates/logmodalcontent.html',
                controller: 'LogModalInstanceCtrl',
                controllerAs: '$ctrl',
                windowClass:'app-modal-window',
                resolve: {
                    famMems: function() {
                        return factory.famMems;
                    },
                    famID: function(){
                        return '';
                    }
                }
            });
            modalInstance.result.then(function (selectedItems) {
                /***** PROBLEM HERE factory.logSession in logLastPage
                gets set to null even if the popup have not been replied
                NEED TO FIGURE OUT WHAT HAPPENS HERE****/
                if(selectedItems == null){
                    factory.logSession.users = null;
                    //recorderFactory.users = null;
                } else {
                    factory.logSession.users = selectedItems;
                //recorderFactory.users = selectedItems;       
                }
                
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        return factory;
}]);


angular.module('FamilySleep').controller('LogModalInstanceCtrl', function ($uibModalInstance, $scope, famMems, famID) {
    var $ctrl = this;
    $ctrl.famMems = famMems;
    $ctrl.buttonState = false;

    // for checkbox buttons in logmodal instance
    $ctrl.checkFam = [];
    for (var i = 0; i < $ctrl.famMems.length; i++) {
        $ctrl.checkFam[i] = ({name: $ctrl.famMems[i], checked : false});
    }

    // checks that at least one button is clicked in logmodal to activate OK button
    $ctrl.isOK = function () {
        for (var i = 0; i < $ctrl.checkFam.length; i++) {
            if ($ctrl.checkFam[i].checked === true) {
                $ctrl.buttonState = true;
                break;
            } else {
                $ctrl.buttonState = false;
            }
        }
    };

    $ctrl.ok = function () {
        var selectedNames = [];
         for (var i = 0; i < $ctrl.checkFam.length; i++) {
            if ($ctrl.checkFam[i].checked === true) {
                selectedNames.push($ctrl.checkFam[i].name)
            }
        }
        $uibModalInstance.close(selectedNames);
        // $scope.onRecord();
        // $scope.$parent.recordStoppedClear = false;
        // $scope.$parent.recordRecording = true;
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});