var quickhitch = angular.module('quickhitch', []);

quickhitch.controller('mainCtrl', function ($scope) {
	$scope.title = "OMGZ IT WORKS";
});

quickhitch.controller('confController', function ($scope, Data) {
	$scope.conferences = Data.conferences;
	$scope.setRide = function(conferenceCode) {
		Data.code = conferenceCode;
		console.log("code set");
	};
});

quickhitch.controller('userController', function ($scope, Data) {

});

quickhitch.controller('rideController', function ($scope, Data) {
	$scope.ride= {
		name: "",
		code: Data.code,
		date: "",
		arrTime:"",
		ampm:AM,
		flightNum: ""
	};
	$scope.valid = false;

	//can add a validator for information here using:
	/*
		adding a ng-if/hide attr in the jade making the button "disabled"
		have a validation function in here corresponding to valid
		until valid = true, hide/disable the button.
		To find out if the information is valid, add a $watch to the ride variable
	*/

	$scope.findRide = function() {
		var currDate = $scope.ride.date.split("/");
		currDate = new Date(parseInt(currDate[2]), parseInt(currDate[0]), parseInt(currDate[1]));


	}
});

quickhitch.factory('Data', ['$http', function($http) {
	var dataFactory = {};
	dataFactory.conferences = [
		{name:"Grace Hopper", code:"GHC"}, 
		{name:"Bitcamp", code:"BIT"}
	];
	dataFactory.users = [
		{name:"Gru", email:"g@gru.com", phone:"123-456-7890"}, 
		{name:"Minion", email:"moop@gru.com", phone:"098-765-4321"}
	];
	dataFactory.code = "";
	return dataFactory;
}]);