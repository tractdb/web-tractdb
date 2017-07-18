'use strict';

angular.module('FamilySleep') // make sure this is set to whatever it is in your client/scripts/app.js
	.controller('SignupCtrl', ['$scope', '$http', '$sanitize', '$location', 'personaFactory', 'selfReportState',
	function ($scope, $http, $sanitize, $location, personaFactory, selfReportState) { // note the added $http depedency
		
		// Here we're creating some local references
		// so that we don't have to type $scope every
		// damn time
		var user,
				signup,
				members;
		var member = {};
		var singleSelfReportMood = {};
		var count = 1;

		// Here we're creating a scope for our Signup page.
		// This will hold our data and methods for this page.
		$scope.member = member;
		$scope.signup = signup = {};
		$scope.signup.user = user = {};
		$scope.signup.user.members = members = []; //might want to make this an object
		$scope.members = [];
		$scope.isAddMemberForm = false; //change it back to false
		$scope.profilePicItems = [
			{name:'p1',
			path:'app/images/avatars/momcircle.png'},
			{name:'p2',
			path:'app/images//avatars/mo1.png'},
			{name:'p3',
			path:'app/images/avatars/mo2.png'},
			{name:'p4',
			path:'app/images/avatars/mo3.png'},
			{name:'p5',
			path:'app/images/avatars/mo4.png'},
			{name:'p6',
			path:'app/images/avatars/dadcircle.png'},
			{name:'p7',
			path:'app/images/avatars/d1.png'},
			{name:'p8',
			path:'app/images/avatars/d2.png'},
			{name:'p9',
			path:'app/images/avatars/d3.png'},
			{name:'p10',
			path:'app/images/avatars/d4.png'},
			{name:'p11',
			path:'app/images/avatars/girlcircle.png'},
			{name:'p12',
			path:'app/images/avatars/f4.png'},
			{name:'p13',
			path:'app/images/avatars/f2.png'},
			{name:'p14',
			path:'app/images/avatars/f3.png'},
			{name:'p15',
			path:'app/images/avatars/f1.png'},
			{name:'p16',
			path:'app/images/avatars/boycircle.png'},
			{name:'p17',
			path:'app/images/avatars/m1.png'},
			{name:'p18',
			path:'app/images/avatars/m2.png'},
			{name:'p19',
			path:'app/images/avatars/m3.png'},
			{name:'p20',
			path:'app/images/avatars/m5.png'}
		];

		$scope.famTypes = ["Father", "Mother", "Daughter", "Son", "Grandfather", "GrandMother", ""];
		$scope.fitbits = ["asdxas", "asdfxz", "asdfserter"];

		// In our signup.html, we'll be using the ng-model
		// attribute to populate this object.

		//I think this goes here:
		//personaFactory.observe($scope, viewModel.updateFamilyInfo);
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
			//console.log("inadd New Member")
			//console.log(member);

			//adding new family members to the personas in personaFactory
			var newMember = angular.copy(member);
			members.push(newMember);
			if(Object.keys(personaFactory.personas).length == 0){
				personaFactory.personas[newMember.pid] = newMember;
				console.log("add new members to personas");
				console.log(personaFactory.personas);
			} else {
				personaFactory.personas[newMember.pid] = newMember;	
			}

			//initializing new family member's mood state
			selfReportState.initializeSingle (newMember.pid);

			/*if(Object.keys(selfReportState.states).length == 0){

			} else {

			}*/
			
			//selfReportState.initializeSingle(newMember.pid);
			console.log("inadd New Member == mood state")
			console.log(selfReportState.states	);
			//console.log("user family");
			//console.log(user);
			member.name = "";
			member.type = "";
			member.profilePic = "";
			member.fitbitId = "";
			member.pid = "";
		}

		signup.addFamily = function() {
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
			console.log("Adding FamID :: IN add member")
			console.log(user);
			//DON'T NEED to use localStorage any longer
			/*
			var result = localStorageService.set('FamilyInfo', user);
            if(result) {
              console.log('writing to local storage family Infoworked!-------------------------');
            }*/
			$scope.isAddMemberForm = true;
			personaFactory.personas = {};
			//personaFactory.retrieveData();
		}

		signup.cancel = function() {
			user.famId = '';
			user.lastname = '';
			user.password1 = '';
			user.password2 = '';
			$scope.isAddMemberForm = false;
			$scope.members = [];
		}

		signup.cancelFromMember = function(){
			user.famId = '';
			user.lastname = '';
			user.password1 = '';
			user.password2 = '';
			$scope.isAddMemberForm = false;
			$scope.members = [];
			//need to clear factory fields
			personaFactory.personas = {};
			selfReportState.states = {};
		}

		// This is our method that will post to our server.
		signup.submit = function () {
			
			// make sure all fields are filled out...
			// aren't you glad you're not typing out
			// $scope.signup.user.firstname everytime now??
			signup.addNewMember();
			console.log("testing all personas were added before PUT");
			var profiles = personaFactory.personas;
			console.log(profiles);

			console.log("after the PUT");
			personaFactory.setData(profiles);
			var profiles = personaFactory.personas;
			console.log(profiles);
			//console.log("in SignupCtrl where $scope.signup");
			//console.log($scope.signup);
			//var json = JSON.stringify($scope.signup);
			//console.log("turned json into stringify");
			//console.log(json);
			//console.log("members in submit function");
			//console.log(members);
			
			//personaFactory.writeToDB();
			//personaFactory.getProfilesfromDB();
			
			changeView();
			//personaFactory.postProfilesToDB();
			/*DON'T NEED this anymore
			//personaFactory.setProfiles(members);
			//signup.cancel();
			
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