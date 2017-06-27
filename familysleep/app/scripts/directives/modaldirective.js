'use strict';

/**
 * @ngdoc directive
 * @name FamilySleep.directive:modalDirective
 * @description
 * # modalDirective
 */

/*angular directive has exmaples iwth timeout functions taht might be useful later on**/
//maybe -- var templateDir = 'templates/';
/*vBest Practice: Use the scope option to create isolate scopes
when making components that you want to reuse throughout your app.*/

angular.module('FamilySleep')
  .directive('modalDirective', function ($modal, $log) {
    return {
    	transclude: true, //only uses this when ythe directive weraps arbitrary content
     	restrict: 'A',
      template: '<a ng-click="open()" ng-transclude>{{name}}</a>',
      scope: {
          useCtrl: "@",
          email: "@"
      },
      scope: {

      },
      link: function (scope, element, attrs) { //used to becalled function postLink() not sure how this works
        //element.text('this is the modalDirective directive');
        console.log('attrs: ' +  attrs);
        log.info('attrs: ' + attrs);
        scope.open = function() {
        	var modalInstance = $modal.open({
                templateUrl: templateDir+attrs.instanceTemplate +'.tpl.html',
                controller:  scope.useCtrl,
                size: 'lg',
                windowClass: 'app-modal-window',
                backdrop: true,
                resolve: {
                    custEmail: function(){
                        return {email: scope.email};
                    }
                }

            });
        	modalInstance.result.then(function(){
                    console.log('Finished');
                }, function(){
                    console.log('Modal dismissed at : ' + new Date());
                });
        };
      }
    };
  });
/*angular.module('FamilySleep').directive('modalDialog', function(){
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      show: '='
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>",
    replace: true, // Replace with the template below
    transclude: true, // Replace with the template below
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function(scope, attrs, element) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
          if (attrs.height)
            scope.dialogStyle.height = attrs.height;
          scope.hideModal = function() {
            scope.show = false;
          };
    }
  };
});*/
