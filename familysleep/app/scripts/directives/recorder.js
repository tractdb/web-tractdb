'use strict';

/**
 * @ngdoc directive
 * @name FamilySleep.directive:recorder
 * @description
 * # recorder
 */
angular.module('FamilySleep')
  .directive('recorder', function ($timeout) {
    return {
      templateUrl: 'app/views/recorder.html',
      //Embed a custom controller in the directive
      controller: function($scope, $window, $http, recorderFactory) {
        $scope.instruction = "Record a Thought";
        $scope.url = "";
        $scope.recordRecording = false;
        $scope.recordStopped = true;
        navigator.getUserMedia(
          {audio:true, video:false},
          function(stream) {
            $window.recordRTC = RecordRTC(stream, {
              //recorderType: StereoAudioRecorder
              //more documantion on type of audio and bps here http://recordrtc.org/
              disableLogs:true,
              mimeType: 'audio/webm',
              bitsPerSecond: 64000
            });
          },
          function(err) {
            console.log("problem");
          }
        )

        // start the recording
        $scope.onRecord = function() {
          $scope.recordStopped = false;
          $scope.prompt = prompt;
          $scope.recordRecording = true;
          $window.recordRTC.startRecording();
        }

        $scope.onRecord = function(prompt) {
          $scope.recordStopped = false;
          $scope.prompt = prompt;
          $scope.recordRecording = true;
          $window.recordRTC.startRecording();
        }

        //stop the recording
        $scope.onStopRecord =  function() {
          $scope.recordStopped = true;
          $scope.recordRecording = false;
          $scope.prompt = "";
          $window.recordRTC.stopRecording (function() {
            $scope.url = decodeURIComponent($window.recordRTC.toURL());
            var recordedBlob = $window.recordRTC.getBlob();
            $scope.recordedBlob = recordedBlob;
            //console.log($scope.url);
            $scope.onSendRecord();
          });
        }

        // sending the recording, not sure if it will get recorder back to clean slate
        $scope.onSendRecord = function() {
          var recordedBlob = $scope.recordedBlob;
          console.log(recordedBlob);
          
          recorderFactory.audio = {'data': recordedBlob, 'endtimeStamp': new Date(), 'users': recorderFactory.users}; 
          // if(recorderFactory.startTime){
          //   recorderFactory.audio = {'data': recordedBlob, 'timeStamp': recorderFactory.startTime, 'users': recorderFactory.users};  
          // } else {
          //   recorderFactory.audio = {'data': recordedBlob, 'timeStamp': new Date(), 'users': recorderFactory.users}; 
          // }
          
          
          console.log(recorderFactory.audio);
          recorderFactory.putData();
        }
      },
      link: function ($scope, element, attrs) { } 
    }
  });