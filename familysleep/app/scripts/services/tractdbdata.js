'use strict';


/**
 * @ngdoc service
 * @name FamilySleep.tractdbdata
 * @description
 * # tractdbdata
 * Factory in the FamilySleep.
 */
 /* This is a factory that is doing GET to call data right now from a file under data/
 */
 /* Since it's a factory, it sounds like Factories need to make other factories as dependencies.
 See sleepDataFactory.
 */
 /*this file will expand as it will have to query data based on data etc. I also think there should be something maintened locally
 so preserve state? and not have to query all the time*/

 /*Another approach to modeling factories
 https://weblogs.asp.net/dwahlin/using-an-angularjs-factory-to-interact-with-a-restful-service
 */


/* TODO: need to figure format data such that sleepDataFactory contains data for all family members
*/
/* Need to formatdata such that we can call ng-repeat on sleepDataFactory on the on the viewers
    sleepDataFactory is an Array, each element is a family member.
*/
angular.module('FamilySleep')
  .factory('tractdbdata', 
    ['$http', '$q', 'sleepDailyDataFactory', 'sleepFamDailyDataFactory', 'sleepWeeklyDataFactory', 'sleepFamWeeklyDataFactory', 'personaFactory',
    function ($http, $q, singleDailySleep, famDailySleep, singleWeeklySleep, famWeeklySleep, personaFactory) { //I want to know if I can use a different name when it's injecteds  


    var temp_data;
    var sleep_data;

    // function update_mood(id, mood, reporter) {
    //   return $http({method:'GET', url: 'data/mom_2017-05-13.json' })
    //     .then(function (response) {
    //       // this callback will be called asynchronously
    //       // when the response is available
    //       temp_data = response.data.sleep[0].logId;
    //       console.log(temp_data);
    //       return put_data(temp_data, 'data/testing.json');
    //     }, function (response) {
    //       // called asynchronously if an error occurs
    //       // or server returns response with an error status.
    //       console.error('Error' + response.statusText);
    //     });
    // }

    // function put_data(data, url) {
    //   return $http.put(url, data)
    //   .then(function (response) {
    //     alert("put success");
    //   }, function(response) {
    //     console.error('Error occured during put: ' + response.statusText);
    //   });
    // }

    function get_single_weekly_sleep_data(factory, id, dates) {
      //use existing function, such as getting data for all fam memeber for one particular day,
      //then repeat that 7 times to update factory
      factory.sleep_data = {};
      factory.ids = [id];
      var promises = [];
      angular.forEach(dates, function(date) {
        factory.sleep_data[id] = {};
        var promise = get_data(factory, id, date);
        promises.push(promise);
      });
      return $q.all(promises);
    }

    function get_fam_weekly_sleep_data(factory, ids, dates) {
      //call loagsingledaily 7 times for different dates and update factory
      factory.sleep_data = {};
      factory.ids = [];
      var promises = [];
      angular.forEach(ids, function(id) {
        factory.ids.push(id);
        angular.forEach(dates, function(date) {
          factory.sleep_data[id] = {};
          var promise = get_data(factory, id, date);
          promises.push(promise);
        });
      });
      return $q.all(promises);
    }

    function get_fam_daily_sleep_data(factory, ids, date) {
      factory.sleep_data = {};
      factory.ids = [];
      var promises = [];
      angular.forEach(ids, function(id) {
        factory.ids.push(id);
        factory.sleep_data[id] = {};
        var promise = get_data(factory, id, date);
        promises.push(promise);
      });
      return $q.all(promises);
    }

    function get_single_daily_sleep_data(factory, id, date) {
      factory.sleep_data = {};
      factory.sleep_data[id] = {};
      factory.ids = [id];
      return get_data(factory, id, date);
    }

    function get_data(factory, id, date) {   
      //right now, it's just for one person. But ideadly, we can to do all ids at the same time and update the sleep_data
      return $http({method:'GET', url: 'data/'+ id + '_' + date + '.json'})  //data/'+ id +'.json'
      .then(function (response) {
        // this callback will be called asynchronously
        // when the response is available
        temp_data = response.data;
        //console.log(temp_data);
        return format_data(factory, id, date, temp_data);     
      }, function (response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        //console.error('Retrieval Error' + response.statusText);
        console.log("filling factory with empties");
        return format_data_empty(factory, id, date);
      })
      .then(function (response) {
        //console.log("format sucess");
      }, function (response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.error('Format Error' + response.statusText);
      });
    }
    /*
    dbfactory.get_sleep = function(){
      $http({method:'GET', url: 'data/sleep_data.json' })
      .then(function (response) {
        //this callback will be called asynchronously
        // when the response is available
        temp_data = response.data;
        //console.log($scope.sleep_data);
      }, function (response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.error('Error' + response.statusText);
      });
      formatdata(temp_data);
    };*/
    /* I could do the formatting of the data here that then is used by all the the sleepdata factory to share across the views
    */
    /* IMPORTANT need to check if mainSleep == 1 in data coming from DB because fitbit tries to capture naps
    */
    //helper function to format the data to be used in the visualization
    /* Data Structure to use for Chartjs which will be put into sleepDataFactory
    can have multiple data sets, just need to know to call which in the viewer

    Each element has:

    data Array<Number> // will need to add one value that represents that empty unslept hours
    label == String
    options
    */
    /* Example of how to acccess json object
        <p> hours slept (need to convert to hours): {{sleep_data.sleep[0].minutesAsleep}}</p>
    <p> wakeup time: {{sleep_data.sleep[0].minuteData[sleep_data.sleep[0].minuteData.length-1].dateTime}}
    <p> Awake count: {{sleep_data.sleep[0].awakeCount}}</p>
    */
    //helper function
    function newDate(time, min) {
      return moment(time).add(min, 'm');
    }

    var format_data = function (factory, id, date, rawData) { //I think I have access to temp_data here don't need to put it as an argument
      return $q(function(resolve, reject) {
        if (temp_data.sleep[0] != null) {
          // var a = [300, 500, 100];
          // factory.data = a;
          // console.log("inside formatdata -- sleep data -- ");
          // console.log(factory.data);
          // //sleepdatafactor.labels -- Array: each element is a lebel that corresponds to the type of sleep and links to the element in .data awway
          // factory.labels =["Hours Slept", "Hours not Slept"];
          //console.log("inside formatdata -- labels -- ");
          //console.log(factory.sleep_data);
          console.log(temp_data.sleep[0]);
          var sleepData = {
            "pid" : id,
            'fid' : temp_data.sleep[0].logId,
            "dateOfSleep": temp_data.sleep[0].dateOfSleep,
            "duration": temp_data.sleep[0].duration,
            "mood": "",
            "moodAddedBy" : "",
            "name": id,
            "minuteData": {
              //'empty': [],
              "one" : [],
              "two" : [],
              "three" : [],
            },
            "startTime": moment(temp_data.sleep[0].startTime),
            "endTime": newDate(temp_data.sleep[0].startTime, temp_data.sleep[0].timeInBed),
            "labels": [],
          };

         
          var realStartTime = moment(temp_data.sleep[0].startTime)
          var targetSleepTime = moment(realStartTime).set({'hour': 17, 'minute': 0, 'second': 0});
          var diffTime = realStartTime.diff(targetSleepTime, 'm');
          console.log('targetSleepTime:' + targetSleepTime.toString());
          console.log('realStartTime' + realStartTime.toString());
          console.log(diffTime)
          if(diffTime > 0) {
            for(var i = 0; i < diffTime; i++) {
                sleepData.minuteData.one.push(0);
                sleepData.minuteData.two.push(0);
                sleepData.minuteData.three.push(0);
                sleepData.labels.push(moment(targetSleepTime).add(i, 'm'));
            }
          }

          for(var i = 0; i < temp_data.sleep[0].minuteData.length; i++) {
            var time = temp_data.sleep[0].minuteData[i];
            if(time.value == 1) {
              sleepData.minuteData.one.push(3);
              sleepData.minuteData.two.push(0);
              sleepData.minuteData.three.push(0);
            } else if(time.value == 2) {
              sleepData.minuteData.one.push(0);
              sleepData.minuteData.two.push(3);
              sleepData.minuteData.three.push(0);
            } else {
              sleepData.minuteData.one.push(0);
              sleepData.minuteData.two.push(0);
              sleepData.minuteData.three.push(3);
            }
            sleepData.labels.push(newDate(temp_data.sleep[0].startTime, i));
          }

          var lengthBefore = sleepData.labels.length;
          console.log(sleepData.labels.length);



          var realEndTime = newDate(temp_data.sleep[0].startTime, temp_data.sleep[0].minuteData.length);
          var targetSleepEndTime = moment(realEndTime).set({'hour': 8, 'minute': 0, 'second': 0});
          var diffTime = realEndTime.diff(targetSleepEndTime, 'm');
          console.log('targetSleepEndTime:' + targetSleepEndTime.toString());
          console.log('realEndTime' + realEndTime.toString());
          console.log(diffTime);
          if(diffTime > 0) {
            sleepData.labels.splice(sleepData.labels.length-diffTime, diffTime);
          } else {
            for(var i = 0; i <= diffTime*-1; i++) {
              sleepData.minuteData.one.push(0);
              sleepData.minuteData.two.push(0);
              sleepData.minuteData.three.push(0);
              sleepData.labels.push(moment(realEndTime).add(i, 'm'));
            }
          }

          // console.log("done with formatting data before");
          // console.log(factory.sleep_data);
          //console.log(factory.sleep_data[id]);
          // add id as label hereb
          factory.sleep_data[id][date] = sleepData;
         // console.log(factory.sleep_data);
          //sleep_data[id] = sleepData;
          //sleep.sleep_data_fact = sleep_data
         // console.log("done with formatting data");
          resolve("sucess");
        } else {
          reject("fail");
        }
      });
    }
    

    var format_data_empty = function (factory, id, date) { //I think I have access to temp_data here don't need to put it as an argument
      return $q(function(resolve, reject) {

          var sleepData = {
            "pid" : id,
            'fid' : "",
            "dateOfSleep": date,
            "duration": -1,
            "mood": "",
            "moodAddedBy" : "",
            "name": id,
            "minuteData": {
              //'empty': [],
              "one" : [],
              "two" : [],
              "three" : [],
            },
            "startTime": "",
            "endTime": "",
            "labels": [],
          };

      
           //console.log("done with formatting data before");
          // console.log(factory.sleep_data);
          //console.log(factory.sleep_data[id]);
          // add id as label hereb
          factory.sleep_data[id][date] = sleepData;
         // console.log(factory.sleep_data);
          //sleep_data[id] = sleepData;
          //sleep.sleep_data_fact = sleep_data
          //console.log("done with formatting data");
          resolve("sucess");
      });
    }

    // Public API here
    //return dbfactory;
    return {
      get_single_daily_sleep: function(id, date) {
        return get_single_daily_sleep_data(singleDailySleep, id, date)
      },
      get_fam_daily_sleep_data: function(ids, date) {
        return get_fam_daily_sleep_data(famDailySleep, ids, date)
      },
      get_single_weekly_sleep_data: function(id, dates) {
        return get_single_weekly_sleep_data(singleWeeklySleep, id, dates)
      }, 
      get_fam_weekly_sleep_data: function(ids, dates) {
        return get_fam_weekly_sleep_data(famWeeklySleep, ids, dates)
      },
    };
  }]);
