angular.module('wTap')

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state){
	$scope.data = {};

	$scope.login = function(){
		console.log("the username is "+ $scope.data.username + "PW" +$scope.data.password);
		LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('home');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
	}
})

.controller('HomeCtrl', function($scope, $ionicConfig){

	$scope.$on('$ionicView.enter', function(){
    	$ionicConfig.views.swipeBackEnabled(false);
  	})
  	$scope.$on('$ionicView.leave', function(){
    	$ionicConfig.views.swipeBackEnabled(true);
  	})

})