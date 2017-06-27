'use strict';

describe('Controller: StackedbarCtrl', function () {

  // load the controller's module
  beforeEach(module('FamilySleep'));

  var StackedbarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StackedbarCtrl = $controller('StackedbarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StackedbarCtrl.awesomeThings.length).toBe(3);
  });
});
