'use strict';

describe('Controller: PiechartcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('FamilySleep'));

  var PiechartcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PiechartcontrollerCtrl = $controller('PiechartcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PiechartcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
