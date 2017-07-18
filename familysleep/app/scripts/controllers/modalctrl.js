'use strict';
/*** TODO need to add mood selected to the sleep object **/
angular.module('FamilySleep').controller('ModalCrtl', ['selfReportState', '$uibModal', '$log', '$document', 'tractdbFactory', 'personaFactory', 'sleepFamDailyDataFactory', 'dateFactory',
    function(selfReportState, $uibModal, $log, $document, tractdbdata, personaFactory, sleepFamDailyDataFactory, dateFactory){
    var templateDir = 'app/views/templates/';
    var $ctrl = this;
    $ctrl.buttonState = 0;

    var moodImages = [
    	{	name:'Happy',
    		image:'app/images/faces/happy.png'
    	},
    	{	name:'Sleepy',
    		image: 'app/images/faces/sleepy.png'
    	},
    	{	name:'Tired',
    	 	image:'app/images/faces/tired.png'
    	},
    	{	name:'Rested',
    	 	image:'app/images/faces/rested.png'
    	},
    	{	name:'In Pain',
    	 	image:'app/images/faces/pain.png'
    	},
      { name:'OK',
        image:'app/images/faces/ok.png'
      },
      { name:'Had a nightmare',
        image: 'app/images/faces/nightmare.png'
      }];
    $ctrl.items = moodImages;

      /***TODO: this need to be initialized when the personas are created. However, the way
    personas is created right now it creates a circual dependenc (which is not possible in angular)
    so have to initialize selfreportstate here*/
    var pids = personaFactory.getAllIDs();
    //console.log("in ModalCrtl initialize, need pids");
    //console.log(pids);
    //TODO: this initialization should be part of the login pipeline
    selfReportState.intializeAll(pids);
    $ctrl.famMems = personaFactory.getAllNames();
    //console.log($ctrl.famMems);
    $ctrl.famIDs = personaFactory.getAllIDs();
  	$ctrl.animationsEnabled = true;
    /**asigning selfReportState factory to states to have access in the viewer*/
    $ctrl.states = selfReportState.getAllMoods();
    /*console.log("printing $ctrl.states object from ModalCrtl");
    console.log($ctrl.states);*/
    $ctrl.famID;

  /*var profiles = personaFactory.getAllProfiles();
  console.log("profiles");
  console.log(profiles);*/

   
	$ctrl.open = function (famID) {
		$log.info("in open of ModalCrtl"); //added this might need to pass log
    console.log(famID);
    $ctrl.famID = famID;
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
      templateUrl: templateDir+'mymodalcontent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      windowClass:'app-modal-window',
      //size: size,
      //appendTo: parentElem,
      resolve: {
        items: function () {
          return $ctrl.items;
        },
        famMems: function(){
          return $ctrl.famMems;
        },
        famID: function(){
          return $ctrl.famID;
        }
      }
    });
    modalInstance.result.then(function (selectedItems) {
      //capturing the selected responses: the mood and the reporter
      //mood
      $ctrl.selected = selectedItems.selected;
      //source of report
      $ctrl.selectedFam = selectedItems.selectedFam;
      
      //console.log("printing on family member sleep object");
      //console.log(sleepFamDailyDataFactory.famID);
      console.log("printing $ctrl.FamID");
      console.log($ctrl.famID);
      $ctrl.states[famID].state = true;
      $ctrl.states[famID].mood = selectedItems.selected.name;
      $ctrl.states[famID].image = selectedItems.selected.image;

      $log.info("******in modalsIntance result");
      selfReportState.setMood($ctrl.famID, selectedItems.selected.name, selectedItems.selected.image, selectedItems.selectedFam);
      //console.log()
      //$log.info(selectedItems.selected);
      //$log.info(selectedItems.selectedFam);
      //$log.info(selectedItems.selected.name);
      //$log.info(selectedItems.selected.image);
      /*$log.info("from $ctrl states");
      $log.info($ctrl.states[famID].state);
      $log.info($ctrl.states[famID].mood);
      $log.info($ctrl.states[famID].image);*/
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
  //$ctrl.famID = famID; //not sure if we need this
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
