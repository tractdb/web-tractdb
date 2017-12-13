'use strict';

angular.module('FamilySleep').controller('ModalCrtl', ['selfReportState', '$uibModal', '$log', '$document', 'tractdbFactory', 'personaFactory', 'dateFactory', '$rootScope',
        function(selfReportState, $uibModal, $log, $document, tractdbdata, personaFactory, dateFactory, $rootScope){
        var templateDir = 'app/views/templates/';
        var $ctrl = this;

        $ctrl.buttonState = 0;
        $ctrl.imgState = 0;

        var moodImages = [
            {   name:'Happy',
                image:'app/images/faces/happy.png'
            },
            {   name:'Sleepy',
                image: 'app/images/faces/sleepy.png'
            },
            {   name:'Tired',
                image:'app/images/faces/tired.png'
            },
            {   name:'Rested',
                image:'app/images/faces/rested.png'
            },
            {   name:'In Pain',
                image:'app/images/faces/pain.png'
            },
            { name:'OK',
                image:'app/images/faces/ok.png'
            },
            { name:'Had a nightmare',
                image: 'app/images/faces/nightmare.png'
            }];
        $ctrl.items = moodImages;


    /*var profiles = personaFactory.getAllProfiles();
    console.log("profiles");
    console.log(profiles);*/

     
    $ctrl.open = function (famID) {
        //$log.info("in open of ModalCrtl"); //added this might need to pass log
        var date = dateFactory.getDateString();
        //console.log(famID);
        $ctrl.famID = famID;

        $ctrl.famMems = personaFactory.getAllNames();
        //console.log($ctrl.famMems);
        $ctrl.famIDs = personaFactory.getAllIDs();
        $ctrl.animationsEnabled = true;
        /**asigning selfReportState factory to states to have access in the viewer*/
        $ctrl.states = selfReportState.getAllMoodsDay($ctrl.famIDs, date);
        /*console.log("printing $ctrl.states object from ModalCrtl");
        console.log($ctrl.states);*/
        //$ctrl.famID;
        $ctrl.famName = personaFactory.getName(famID);

        console.log(famID);
        $ctrl.famID = famID;
        $ctrl.buttonState = 0;
        $ctrl.imgState = 0;

        for (var i = 0; i < $ctrl.famIDs.length; i++) {
                if ($ctrl.famIDs[i] == $ctrl.famID) {
                        $ctrl.self = $ctrl.famMems[i];
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
            backdrop: 'static',
            keyboard: false,
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
                },
                famName: function(){
                    return $ctrl.famName;
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
            // console.log("printing $ctrl.FamID");
            // console.log($ctrl.famID);
            $ctrl.states[$ctrl.famID].state = true;
            $ctrl.states[$ctrl.famID].mood = selectedItems.selected.name;
            $ctrl.states[$ctrl.famID].image = selectedItems.selected.image;
            var reporterID;
            if(selectedItems.selectedFam == 'MYSELF'){
                reporterID = personaFactory.getID($ctrl.self);
            } else {
                reporterID = personaFactory.getID(selectedItems.selectedFam);
            }
            

            // console.log('$ctrl.states');
            // console.log($ctrl.states);
            // console.log("******in modalsIntance result");
            // console.log('personas');
            // console.log(personaFactory.personas);
            var date = dateFactory.getDateString();
            selfReportState.setMood($ctrl.famID, selectedItems.selected.name, selectedItems.selected.image, reporterID, date);
            selfReportState.putData();
            $rootScope.$broadcast('modalview:updated');
            // console.log('personaFactory personas');
            // console.log(personaFactory.personas);
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
  //adding observations
  //but creates an automatic popup based on timer
  // selfReportState.observe($ctrl, $ctrl.open);
  // personaFactory.observe($ctrl, $ctrl.open);
}]);

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('FamilySleep').controller('ModalInstanceCtrl', function ($uibModalInstance, items, famMems, $log, famID, famName) {
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.famID = famID; //not sure if we need this
    $ctrl.famName = famName;
    //creating an object
    /*$ctrl.selected = {
        item: $ctrl.items[0]
    };*/

    $ctrl.famMems = famMems;
    //creating an object
    /*$ctrl.selectedFam = {
        item: $ctrl.famMems[0]
    };*/

    // set activeMoodReporter class to modal reporter buttons for styling clicked/active buttons
    $ctrl.activeReporterMenu = "None";
    $ctrl.setActiveMoodReporter = function(famName) {
        $ctrl.activeReporterMenu = famName;
    }

    // set activeMoodItem class to modal mood pictures for styling clicked/active images
    $ctrl.activeModalMoodPicMenu = "None";
    $ctrl.setActiveMoodPic = function(modalMoodPicItem) {
        $ctrl.activeModalMoodPicMenu = modalMoodPicItem;
    }

    $ctrl.ok = function () {
        $uibModalInstance.close({selected: $ctrl.selected.item, selectedFam: $ctrl.selectedFam.item});
        // $log.info("inside ModalInstanceCtrl OK");
        // $log.info($ctrl.selected.item);
        // $log.info($ctrl.selectedFam.item);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
