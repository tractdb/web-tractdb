'use strict';

/**
 * @ngdoc service
 * @name FamilySleep.sleepDailyDataFactory
 * @description
 * # sleepDailyDataFactory
 * Factory in the FamilySleep.
 */

 /*
  Format

  {
    ids : [],
    sleep_data : {
      ids : []
      id : {
        date : {
          pid: String
          fid: int,
          name: String,
          dateOfSleep: String,
          duration: int,
          mood: String,
          moodAddedBy : String,
          minuteData: {
            one : [ ints
            ],
            two : [ ints
            ],
            three: [ ints
            ]
          },
          startTime: Moment,
          endTime: Moment
        }
      }
    }
  
  }

 */
angular.module('FamilySleep')
  .factory('sleepDailyDataFactory', function () {
    // Service logic
    // ...

    // Public API here
    return {
/*      someMethod: function () {
        return meaningOfLife;
      }*/
    };
  });
