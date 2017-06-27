'use strict';

describe('Controller: FamweeklyviewCtrl', function () {

  // load the controller's module
  beforeEach(module('FamilySleep'));

  var FamweeklyviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FamweeklyviewCtrl = $controller('FamweeklyviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FamweeklyviewCtrl.awesomeThings.length).toBe(3);
  });
});
