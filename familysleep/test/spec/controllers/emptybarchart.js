'use strict';

describe('Controller: EmptybarchartCtrl', function () {

  // load the controller's module
  beforeEach(module('FamilySleep'));

  var EmptybarchartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmptybarchartCtrl = $controller('EmptybarchartCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EmptybarchartCtrl.awesomeThings.length).toBe(3);
  });
});
