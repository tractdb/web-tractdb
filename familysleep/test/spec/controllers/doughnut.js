'use strict';

describe('Controller: DoughnutCtrl', function () {

  // load the controller's module
  beforeEach(module('FamilySleep'));

  var DoughnutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DoughnutCtrl = $controller('DoughnutCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DoughnutCtrl.awesomeThings.length).toBe(3);
  });
});
