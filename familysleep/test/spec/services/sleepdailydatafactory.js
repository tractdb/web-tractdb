'use strict';

describe('Service: sleepDailyDataFactory', function () {

  // load the service's module
  beforeEach(module('FamilySleep'));

  // instantiate service
  var sleepDailyDataFactory;
  beforeEach(inject(function (_sleepDailyDataFactory_) {
    sleepDailyDataFactory = _sleepDailyDataFactory_;
  }));

  it('should do something', function () {
    expect(!!sleepDailyDataFactory).toBe(true);
  });

});
