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

      templateUrl: '../../views/recorder.html',
      //Embed a custom controller in the directive
      controller: function($scope, $window, $http) {
        $scope.instruction = "Tap to record";
        $scope.url = "";
        $scope.recordStoppedClear = true;
        $scope.recordRecording = false;
        $scope.recordPausing = false;
        $scope.recordStopped = false;
        $scope.recordReplay = false;
        navigator.getUserMedia(
          {audio:true, video:false},
          function(stream) {
            $window.recordRTC = RecordRTC(stream, {
              recorderType: StereoAudioRecorder
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

        // pause the recording
        $scope.onPause = function(audioUrl) {
          $window.recordRTC.pauseRecording();
          $scope.recordPausing = true;
          $scope.recordRecording = false;
        }

        //resume the paused recording
        $scope.onResume = function() {
          $window.recordRTC.resumeRecording();
          $scope.recordPausing = false;
          $scope.recordRecording = true;
        }

        $scope.onReplay = function() {
          console.log("replaying");
          console.log($window.recordRTC.toURL());
          $scope.url = $window.recordRTC.toURL();
        }


        $scope.onDelete = function() {
          $scope.recordStoppedClear = true;
          $scope.recordRecording = false;
          $scope.recordPausing = false;
          $scope.recordStopped = false;
          $scope.recordReplay = false;
          recorder.reset();
        }

        //stop the recording
        $scope.onStopRecord =  function() {
          $scope.recordStopped = true;
          $scope.recordRecording = false;
          $scope.recordPausing = false;
          $window.recordRTC.stopRecording (function() {
            $scope.url = $window.recordRTC.toURL();
            var recordedBlob = $window.recordRTC.getBlob();
            $scope.recordedBlob = recordedBlob;
            console.log($scope.url);
          });
        }

        $scope.onReplayRecord =  function() {
          $scope.recordReplay = true;
          $scope.url = $window.recordRTC.toURL();
        }
        
        // sending the recording, not sure if it will get recorder back to clean slate
        $scope.onSendRecord = function() {
          var recordedBlob = $scope.recordedBlob;
          console.log(recordedBlob);
          //recordRTC.getDataURL()
          var formData = new FormData();
          console.log(formData);
          formData.append('test', recordedBlob);
          $http.post('http://localhost:3000', formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          })
          .then(function(result) {
            console.log("done")
            $scope.recordStoppedClear = true;
          })
          //temp
          $scope.recordStoppedClear = true;
          $scope.recordRecording = false;
          $scope.recordPausing = false;
          $scope.recordStopped = false;
          $scope.recordReplay = false;
        }
      },
      link: function ($scope, element, attrs) { } //DOM manipulation
    }
  });
