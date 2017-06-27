'use strict';

describe('Controller: SingledailyviewCtrl', function () {

  // load the controller's module
  beforeEach(module('FamilySleep'));

  var SingledailyviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SingledailyviewCtrl = $controller('SingledailyviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SingledailyviewCtrl.awesomeThings.length).toBe(3);
  });
});
