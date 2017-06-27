'use strict';

describe('Service: sleepDataService', function () {

  // load the service's module
  beforeEach(module('FamilySleep'));

  // instantiate service
  var sleepDataService;
  beforeEach(inject(function (_sleepDataService_) {
    sleepDataService = _sleepDataService_;
  }));

  it('should do something', function () {
    expect(!!sleepDataService).toBe(true);
  });

});
