'use strict';

describe('Directive: recorder', function () {

  // load the directive's module
  beforeEach(module('FamilySleep'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<recorder></recorder>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the recorder directive');
  }));
});
