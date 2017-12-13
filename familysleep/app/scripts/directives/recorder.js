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
      // restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      // scope: {
      //     //@ reads the attribute value, = provides two-way binding, & works with functions
      //     title: '@'         },

      templateUrl: 'app/views/recorder.html',
      //Embed a custom controller in the directive
      controller: function($scope, $window, $http, recorderFactory) {
        $scope.instruction = "Tap to record";
        $scope.url = "";
        $scope.recordStoppedClear = true;
        $scope.recordRecording = false;
        // $scope.recordPausing = false;
        $scope.recordStopped = false;
        // $scope.recordReplay = false;
        navigator.getUserMedia(
          {audio:true, video:false},
          function(stream) {
            $window.recordRTC = RecordRTC(stream, {
              //recorderType: StereoAudioRecorder
              //more documantion on type of audio and bps here http://recordrtc.org/
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
          $scope.recordStoppedClear = false;
          $scope.recordRecording = true;
          $window.recordRTC.startRecording();
        }

        // // pause the recording
        // $scope.onPause = function(audioUrl) {
        //   $window.recordRTC.pauseRecording();
        //   $scope.recordPausing = true;
        //   $scope.recordRecording = false;
        // }

        //resume the paused recording
        // $scope.onResume = function() {
        //   $window.recordRTC.resumeRecording();
        //   $scope.recordPausing = false;
        //   $scope.recordRecording = true;
        // }

        // $scope.onReplay = function() {
        //   console.log("replaying");
        //   console.log($window.recordRTC.toURL());
        //   $scope.url = decodeURIComponent($window.recordRTC.toURL());
        // }


        // $scope.onDelete = function() {
        //   $scope.recordStoppedClear = true;
        //   $scope.recordRecording = false;
        //   $scope.recordPausing = false;
        //   $scope.recordStopped = false;
        //   $scope.recordReplay = false;
        //   //recorder.reset();
        // }

        //stop the recording
        $scope.onStopRecord =  function() {
          $scope.recordStopped = true;
          $scope.recordRecording = false;
          $scope.recordPausing = false;
          $window.recordRTC.stopRecording (function() {
            $scope.url = decodeURIComponent($window.recordRTC.toURL());
            var recordedBlob = $window.recordRTC.getBlob();
            $scope.recordedBlob = recordedBlob;
            //console.log($scope.url);
            $scope.onSendRecord();
          });
        }

        // $scope.onReplayRecord =  function() {
        //   $scope.recordReplay = true;
        //   $scope.url = $window.recordRTC.toURL();
        // }
        
        // sending the recording, not sure if it will get recorder back to clean slate
        $scope.onSendRecord = function() {
          $scope.recordStoppedClear = true;
          $scope.recordRecording = false;
          $scope.recordPausing = false;
          $scope.recordStopped = false;
          $scope.recordReplay = false;
          var recordedBlob = $scope.recordedBlob;
          console.log(recordedBlob);
          recorderFactory.audio = {'data': recordedBlob, 'timeStamp': new Date(), 'users': recorderFactory.users};
          console.log(recorderFactory.audio);
          recorderFactory.putData();
        }
      },
      link: function ($scope, element, attrs) { } 
    }
  });
