'use strict';

describe('Controller: FambarviewCtrl', function () {

  // load the controller's module
  beforeEach(module('FamilySleep'));

  var FambarviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FambarviewCtrl = $controller('FambarviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FambarviewCtrl.awesomeThings.length).toBe(3);
  });
});
