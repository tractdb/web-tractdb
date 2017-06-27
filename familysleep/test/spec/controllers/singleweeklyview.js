'use strict';

describe('Controller: SingleweeklyviewCtrl', function () {

  // load the controller's module
  beforeEach(module('FamilySleep'));

  var SingleweeklyviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SingleweeklyviewCtrl = $controller('SingleweeklyviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SingleweeklyviewCtrl.awesomeThings.length).toBe(3);
  });
});
