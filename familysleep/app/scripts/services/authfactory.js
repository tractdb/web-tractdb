'use strict';

/**
 * @ngdoc service
 * @name FamilySleep.authFactory
 * @description
 * # authFactory
 * Factory in the FamilySleep.
 */
angular.module('FamilySleep')
    .factory('authFactory', 
        [
            '$http', 'BASEURL_PYRAMID',
            function ($http, BASEURL_PYRAMID) {
            // Service logic
            // ...

            //var meaningOfLife = 42;

            // Public API here
            var user;
            var authenticated;

            return {
                setUser : function(aUser){
                    user = aUser;
                },
                setAuthenticated : function(state){ //takes a boolean
                    authenticated = state;
                },
                isLoggedIn : function(){
                    return(user)? user : false;
                },
                isAuthenticated : function(){
                    return $http({
                        method: 'GET',
                        url: BASEURL_PYRAMID + '/authenticated'
                    }).then(
                        // successful response
                        function (response) {
                            user = response.data.account;
                            authenticated = true;
                            return user;
                        },
                        // error response
                        function (response) {
                            return false;
                            //window.alert('Invalid account or password.');
                        }
                    );
                }
            };
  }]);
