'use strict';

describe('Service: personaFactory', function () {

  // load the service's module
  beforeEach(module('FamilySleep'));

  // instantiate service
  var personaFactory;
  beforeEach(inject(function (_personaFactory_) {
    personaFactory = _personaFactory_;
  }));

  it('should do something', function () {
    expect(!!personaFactory).toBe(true);
  });

});
