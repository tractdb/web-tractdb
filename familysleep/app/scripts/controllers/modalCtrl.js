'use strict';
/*** TODO need to add mood selected to the sleep object **/
angular.module('FamilySleep').controller('ModalCrtl', ['selfReportState', '$uibModal', '$log', '$document', 'tractdbdata', 'personaFactory', 'sleepFamDailyDataFactory', 'dateFactory',
  function(selfReportState, $uibModal, $log, $document, tractdbdata, personaFactory, sleepFamDailyDataFactory, dateFactory){
  var templateDir = 'views/templates/';
	var $ctrl = this;
  $ctrl.buttonState = 0;

	var moodImages = [
		{	name:'Happy',
			image:'images/faces/happy.png'
		},
		{	name:'Sleepy',
			image: 'images/faces/sleepy.png'
		},
		{	name:'Tired',
		 	image:'images/faces/tired.png'
		},
		{	name:'Rested',
		 	image:'images/faces/rested.png'
		},
		{	name:'In Pain',
		 	image:'images/faces/pain.png'
		},
    { name:'OK',
      image:'images/faces/ok.png'
    },
    { name:'Had a nightmare',
      image: 'images/faces/nightmare.png'
    }];
  $ctrl.items = moodImages;
	
  
  //$ctrl.famMems = ['mom', 'dad', 'child1', 'child2'];
  $ctrl.famMems = personaFactory.getAllNames();
  //console.log($ctrl.famMems);
  $ctrl.famIDs = personaFactory.getAllIDs();
	$ctrl.animationsEnabled = true;
  /**asigning selfReportState factory to states to have access in the viewer*/
  $ctrl.states = selfReportState;
  $ctrl.famID;

  /*var profiles = personaFactory.getAllProfiles();
  console.log("profiles");
  console.log(profiles);*/

  //this could be that now we can use 
	$ctrl.open = function (famID) {
		$log.info("in open of ModalCrtl"); //added this might need to pass log
    console.log(famID);
    var fam = famID;
    $ctrl.famID = fam;
    $ctrl.buttonState = 0;
    for (var i = 0; i < $ctrl.famIDs.length; i++) {
      if ($ctrl.famIDs[i] == $ctrl.famID) {
        $ctrl.famMems[i] = 'MYSELF';
        break;
      }
    }
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: templateDir+'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      windowClass:'app-modal-window',
      //size: size,
      //appendTo: parentElem,
      resolve: {
        items: function () {
          return $ctrl.items;
        },
        famMems: function(){ //I don't understand what this does
          return $ctrl.famMems;
        },
        famID: function(){
          return $ctrl.famID;
        }
      }
    });
    modalInstance.result.then(function (selectedItems) {
      $ctrl.selected = selectedItems.selected;
      $ctrl.selectedFam = selectedItems.selectedFam;
      var dateStr = dateFactory.getDateString();
      //selfReportState.dateStr = {}
      $ctrl.states[famID].state = selfReportState[famID].state = true;
      console.log("printing on family member sleep object");
      console.log(sleepFamDailyDataFactory.famID);
      $ctrl.states[famID].mood = selfReportState[famID].mood = selectedItems.selected.name;
      $ctrl.states[famID].image = selfReportState[famID].image = selectedItems.selected.image;

      $log.info("******in modalsIntance result");
      //$log.info(selectedItems.selected);
      //$log.info(selectedItems.selectedFam);
      $log.info(selectedItems.selected.name);
      $log.info(selectedItems.selected.image);
      $log.info("from $ctrl states");
      $log.info($ctrl.states[famID].state);
      $log.info($ctrl.states[famID].mood);
      $log.info($ctrl.states[famID].image);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}]);

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('FamilySleep').controller('ModalInstanceCtrl', function ($uibModalInstance, items, famMems, $log, famID) {
  var $ctrl = this;
  $ctrl.items = items;
  $ctrl.famID = famID;
  //creating an object
  /*$ctrl.selected = {
    item: $ctrl.items[0]
  };*/

  $ctrl.famMems = famMems;
  //creating an object
  /*$ctrl.selectedFam = {
    item: $ctrl.famMems[0]
  };*/

  $ctrl.ok = function () {
    $uibModalInstance.close({selected: $ctrl.selected.item, selectedFam: $ctrl.selectedFam.item});
    $log.info("inside ModalInstanceCtrl OK");
    $log.info($ctrl.selected.item);
    $log.info($ctrl.selectedFam.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});