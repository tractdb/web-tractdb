'use strict';

describe('Service: selfReportState', function () {

  // load the service's module
  beforeEach(module('FamilySleep'));

  // instantiate service
  var selfReportState;
  beforeEach(inject(function (_selfReportState_) {
    selfReportState = _selfReportState_;
  }));

  it('should do something', function () {
    expect(!!selfReportState).toBe(true);
  });

});
