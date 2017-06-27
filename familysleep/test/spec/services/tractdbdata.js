'use strict';

describe('Service: tractdbdata', function () {

  // load the service's module
  beforeEach(module('FamilySleep'));

  // instantiate service
  var tractdb.data;
  beforeEach(inject(function (_tractdbdata_) {
    tractdbdata = _tractdbdata_;
  }));

  it('should do something', function () {
    expect(!!tractdbdata).toBe(true);
  });

});
