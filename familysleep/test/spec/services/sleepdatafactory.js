'use strict';

describe('Service: sleepDataFactory', function () {

  // load the service's module
  beforeEach(module('FamilySleep'));

  // instantiate service
  var sleepDataFactory;
  beforeEach(inject(function (_sleepDataFactory_) {
    sleepDataFactory = _sleepDataFactory_;
  }));

  it('should do something', function () {
    expect(!!sleepDataFactory).toBe(true);
  });

});
