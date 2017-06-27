'use strict';

/**
 * @ngdoc service
 * @name FamilySleep.sleepDataFactory
 * @description
 * # sleepDataFactory
 * Factory in the FamilySleep.
 */

 /* All controllers that are visualizing data need to have access to this factory singleton
 */
 /* for controllers using this data should check if there's data in it or not.
 */
 /* This is a singleton that gets shared across controllers to that contains:
 array of, for each family member:
      - represent sleep data to be visualized
      - as well as the mood of the family member
 */
angular.module('FamilySleep')
  .factory('sleepDataFactory', function () {
   //I think we might want get/sets here
    return{};
  });
