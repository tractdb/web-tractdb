'use strict';

describe('Controller: SdviewCtrl', function () {

  // load the controller's module
  beforeEach(module('FamilySleep'));

  var SdviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SdviewCtrl = $controller('SdviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SdviewCtrl.awesomeThings.length).toBe(3);
  });
});
