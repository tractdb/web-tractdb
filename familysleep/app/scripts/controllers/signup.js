'use strict';

angular.module('FamilySleep') // make sure this is set to whatever it is in your client/scripts/app.js
	.controller('SignupCtrl', ['localStorageService', '$scope', '$http', '$sanitize', '$location', 
	function (localStorage, $scope, $http, $sanitize, $location) { // note the added $http depedency
		
		// Here we're creating some local references
		// so that we don't have to type $scope every
		// damn time
		var user,
				signup,
				members;
		var member = {};
		var count = 1;

		// Here we're creating a scope for our Signup page.
		// This will hold our data and methods for this page.
		$scope.member = member;
		$scope.signup = signup = {};
		$scope.signup.user = user = {};
		$scope.signup.user.members = members = [];
		//$scope.members = [];
		$scope.isAddMemberForm = false;
		$scope.profilePicItems = [
			{name:'p1',
			path:'images/avatars/momcircle.png'},
			{name:'p2',
			path:'images/avatars/mo1.png'},
			{name:'p3',
			path:'images/avatars/mo2.png'},
			{name:'p4',
			path:'images/avatars/mo3.png'},
			{name:'p5',
			path:'images/avatars/mo4.png'},
			{name:'p6',
			path:'images/avatars/dadcircle.png'},
			{name:'p7',
			path:'images/avatars/d1.png'},
			{name:'p8',
			path:'images/avatars/d2.png'},
			{name:'p9',
			path:'images/avatars/d3.png'},
			{name:'p10',
			path:'images/avatars/d4.png'},
			{name:'p11',
			path:'images/avatars/girlcircle.png'},
			{name:'p12',
			path:'images/avatars/f4.png'},
			{name:'p13',
			path:'images/avatars/f2.png'},
			{name:'p14',
			path:'images/avatars/f3.png'},
			{name:'p15',
			path:'images/avatars/f1.png'},
			{name:'p16',
			path:'images/avatars/boycircle.png'},
			{name:'p17',
			path:'images/avatars/m1.png'},
			{name:'p18',
			path:'images/avatars/m2.png'},
			{name:'p19',
			path:'images/avatars/m3.png'},
			{name:'p20',
			path:'images/avatars/m5.png'}
		];

		// In our signup.html, we'll be using the ng-model
		// attribute to populate this object.
		function changeView(){
			var view = '/familydailyview';
			$location.path(view);
		}
		signup.addNewMember = function() {
			if (
				!member.name ||
				!member.type ||
				!member.profilePic 
				//||!member.fitbitId
			) {
				alert('Please fill out all form fields.');
				return false;
			}

			member.pid = 'm' + count;
			count++;
			console.log(member);
			var newMember = angular.copy(member);
			members.push(newMember);
			member.name = "";
			member.type = "";
			member.profilePic = "";
			member.fitbitId = "";
			member.pid = "";
			console.log(members);
		}

		signup.addMembers = function() {
			if (
				!user.famId ||
				!user.lastname ||
				!user.password1 ||
				!user.password2
			) {
				alert('Please fill out all form fields.');
				return false;
			}

			// make sure the passwords match match
			if (user.password1 !== user.password2) {
				alert('Your passwords must match.');
				return false;
			}
			console.log(user);
			$scope.isAddMemberForm = true;
		}

		signup.cancel = function() {
			user.famId = '';
			user.lastname = '';
			user.password1 = '';
			user.password2 = '';
			$scope.isAddMemberForm = false;
			$scope.members = [];
		}

		// This is our method that will post to our server.
		signup.submit = function () {
			
			// make sure all fields are filled out...
			// aren't you glad you're not typing out
			// $scope.signup.user.firstname everytime now??
			signup.addNewMember();
			var json = JSON.stringify($scope.signup);

			console.log(json); 
			signup.cancel();
			changeView();
			//WRITING TO SERVER
			/*
			// Make the request to the server ... which doesn't exist just yet
			var request = $http.post('/signup', user);

			// we'll come back to here and fill in more when ready
			request.success(function (data) {
				 console.log(data.msg);
			});

			request.error(function (data) {
				 console.log(data.msg);
			});*/

		};
		
	}]);