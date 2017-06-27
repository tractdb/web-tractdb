'use strict';

describe('Controller: DatepickercontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('FamilySleep'));

  var DatepickercontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DatepickercontrollerCtrl = $controller('DatepickercontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DatepickercontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
