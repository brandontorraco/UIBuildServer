require('jquery');
require('angular');

var app = angular.module('myApp', []);


app.controller('appController', function($scope) {

    $scope.firstname = "firstname";
    $scope.background = 999;
    $scope.lastname = "lastname";
    $scope.phone = 6023189994;
	$scope.listOfStuff = ["Apple Juice","Cookies","Carrots","Pasta"];
	
	$scope.makeTheList = function(){
		$scope.listOfStuff = ["Apples","Oranges","Bananas","Kiwis","Lettuce","Carrots"]
	}

	$scope.changeTheList = function(){
		$scope.listOfStuff = ["Pizza","Cookies","Ice Cream","Candy","Pasta","Cake"]
	}

	$scope.doStuff = function(){
		alert('Greetings from the Angular Controller!!!');
	}

	$scope.resetBg = function(){
	    $scope.background = '999';
	}

	$scope.orangeBg = function(){
	    $scope.background = 'ff6600';
	}

	$scope.blueBg = function(){
	    $scope.background = '0000ff';
	}

	$scope.redBg = function(){
	    $scope.background = 'b70000';
	}

	$scope.purpleBg = function(){
	    $scope.background = '9b00b7';
	}

});