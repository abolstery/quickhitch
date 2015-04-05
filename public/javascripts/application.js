
var quickhitch = angular.module('quickhitch', []);
quickhitch.controller('mainCtrl', function ($scope) {

});

quickhitch.controller('confController', function ($scope, Data) {
	$scope.conferences = Data.conferences;
	$scope.setRide = function(conferenceCode) {
		Data.setCode(conferenceCode);
		//Data.code = conferenceCode;
	};
});
quickhitch.controller('userController', function ($scope, Data) {

});

quickhitch.controller('rideController', function ($scope, Data) {
	$scope.options = Data.options;
	$scope.ride= {
		name: "",
		code: Data.code,
		date: "",
		dateObj:"",
		arrTime:"",
		milTime:"",
		ampm: Data.options[0],
		flightNum: "",
		phone:""
	};
	$scope.valid = false;
	$scope.noMatch = false;
	$scope.matches = [];
	
	//var url = localhost:3000/books //jenkov.com/theService.json?callback=JSON_CALLBACK";
	//var responsePromise = $http.jsonp( url,
      //       {  params : {
        //           $scope.name : "flightNum"
          //      }
            //  }
            //);


//can add a validator for information here using:
/*
adding a ng-if/hide attr in the jade making the button "disabled"
have a validation function in here corresponding to valid
until valid = true, hide/disable the button.
To find out if the information is valid, add a $watch to the ride variable
*/
$scope.reset = function() {
	$scope.valid = false;
	$scope.noMatch = false;
}
$scope.findRide = function() {
//validate information
//if information is deemed valid:
$scope.valid = true;
var currDate = $scope.ride.date.split("/");
currDate = new Date(parseInt(currDate[2]), parseInt(currDate[0]-1), parseInt(currDate[1]));
$scope.ride.dateObj = currDate;
var time = $scope.ride.arrTime.split(":");

if($scope.ride.ampm === "PM" && !(time[0] === "12")) { //if pm
	time[0] = parseInt(time[0]) + 12; //adjust for PM
}
$scope.ride.milTime = time[0].toString() + time[1]; //saves the 24hr time
if(!_.isEmpty(Data.matches)) { //if there are potential matches						//remove current user from the match list.
		Data.matches = _.reject(Data.matches, function(val) {
		return val.name === $scope.ride.name
	})
	//filter current match list by date (using underscore.js)
	var matches = _.where(Data.matches, {date:$scope.ride.date, code:$scope.ride.code});
	//filter by arrival times close to the user arrival time
	matches = _.filter(matches, function(item) {return Math.abs(item.milTime - $scope.ride.milTime) <= 30})
	//sort by the time
	matches = _.sortBy(matches, function(val) {return val.milTime} );
	//start matching based on the new list.
	$scope.matches = matches;
}
if($scope.matches.length == 0) { //if no matches were found
	$scope.noMatch = true;
}
//after matching is done, put current user in the match list
	Data.addMatch($scope.ride);
}
});
quickhitch.factory('Data', ['$http', function($http) {
	var dataFactory = {};
	dataFactory.options = [ "AM" , "PM" ];
	dataFactory.conferences = [
		{name:"Grace Hopper", code:"GHC"},
		{name:"Bitcamp", code:"BIT"}
	];
	dataFactory.users = [
		{name:"Gru", email:"g@gru.com", phone:"123-456-7890"},
		{name:"Minion", email:"moop@gru.com", phone:"098-765-4321"}
	];
	dataFactory.matches = [];

	$http.get('files/matches.txt').
	success(function(response) {
		dataFactory.matches = response;
	}).error(function(response) {
		console.log("failed");
	})
	dataFactory.addMatch = function(userInfo) {
		dataFactory.matches.push(userInfo);
	}
	dataFactory.setCode = function(conferenceCode) {
		dataFactory.code = conferenceCode;
	}
	dataFactory.code = "";
	return dataFactory;
}]);
//adopted from http://codepen.io/tutorialab/pen/JDxkn
quickhitch.directive("datepicker", function () {
	return {
		restrict: "A",
		require: "ngModel",
		link:
		function (scope, elem, attrs, ngModelCtrl) {
			var updateModel = function (dateText) {
				scope.$apply(function () {
					ngModelCtrl.$setViewValue(dateText);
				});
			};
			var options = {
				dateFormat: "mm/dd/yy",
				onSelect: function (dateText) {
					updateModel(dateText);
				}
			};
			elem.datepicker(options);
		}
	}
});





