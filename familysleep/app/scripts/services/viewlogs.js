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
                {'page' : '', 'date' : },
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
                    {'page' : '', 'date' : },
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
  ['$timeout', '$uibModal', 'personaFactory', function ($timeout, $uibModal, personaFactory) {
    var factory = {};

    factory.logs = {};
    factory.logSession = null;

    factory.logLastPage = function (currentTime) {
      if(factory.logSession.sessionTimeStamps[factory.logSession.pages.length-1] == currentTime) {
        factory.logs[factory.logSession.startTime] = {
            'users' : factory.logSession.users,
            'timeStamp': {
                'startTime': factory.logSession.startTime,
                'endTime': currentTime
            },
            'pages' : factory.logSession.pages
        }   
        factory.logSession = null;
      }
    };

    factory.logPage = function (page, date) {
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
      var currentTime = new Date();
      if (factory.logSession == null) {

        $timeout(factory.popup, 1 * 10000);

        factory.logSession = {
            'pages': [],
            'sessionTimeStamps': [],
            'users' : [],
            'startTime': null,
            'endTime': null
        };
        factory.logSession.startTime = currentTime;   
      }
      factory.logSession.pages.push({'page': page, 'date': date});
      factory.logSession.sessionTimeStamps.push(currentTime);
      $timeout(factory.logLastPage, 6 * 10000, true, currentTime);
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
        factory.logSession.users.push(selectedItems.selectedFam);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    return factory;
}]);


angular.module('FamilySleep').controller('LogModalInstanceCtrl', function ($uibModalInstance, famMems, famID) {
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
    $uibModalInstance.close({selectedFam: $ctrl.selectedFam.item});
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});