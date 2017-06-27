'use strict';

describe('Controller: MoonCtrl', function () {

  // load the controller's module
  beforeEach(module('FamilySleep'));

  var MoonctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MoonctrlCtrl = $controller('MoonCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MoonCtrl.awesomeThings.length).toBe(3);
  });
});
