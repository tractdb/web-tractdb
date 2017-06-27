'use strict';

describe('Service: viewLogs', function () {

  // load the service's module
  beforeEach(module('FamilySleep'));

  // instantiate service
  var viewLogs;
  beforeEach(inject(function (_viewLogs_) {
    viewLogs = _viewLogs_;
  }));

  it('should do something', function () {
    expect(!!viewLogs).toBe(true);
  });

});
