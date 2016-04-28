angular.module('wTap')

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $q, UserService, $ionicLoading){
	$scope.data = {};
	$scope.login = function(){
		console.log("the username is "+ $scope.data.username + "PW" +$scope.data.password);
		LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('app');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
	};

  // This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage
      UserService.setUser({
        authResponse: authResponse,
        userID: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });
      $ionicLoading.hide();
      $state.go('app');
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
    var alertPopup = $ionicPopup.alert({
                title: 'Login failed!'
            });
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

        // Check if we have our user saved
        var user = UserService.getUser('facebook');

        if(!user.userID){
          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            });

            $state.go('app');
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
          });
        }else{
          $state.go('app');
        }
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
        // but has not authenticated your app
        // Else the person is not logged into Facebook,
        // so we're not sure if they are logged into this app or not.

        console.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Logging in...'
        });

        // Ask the permissions you need. You can learn more about
        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
})

.controller('HomeCtrl', function($scope, $ionicConfig, UserService, $state) {
  var data = UserService.getUser();
  document.getElementById("userName").innerHTML = data.name;
  var image = document.getElementById("userPic");
  image.src = data.picture;
  console.log(data.email);
  $scope.user = {email: data.email};

  $scope.goBack = function(){
    console.log('I got clicked');
    $state.go('app');
  };

})

.controller('SignupCtrl', function($scope, $state, $ionicPopup){
  $scope.otpPopup = function(){

    $scope.data = {};

    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.otp">',
      title: 'Verification',
      subTitle: 'Please enter the OTP',
      scope: $scope,
      buttons: [
        {
          text: '<b>Submit</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.otp) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              $state.go('app');
              return $scope.data.otp;
            }
          }
        }
      ]
    });

  }
})

.controller('HealthCtrl', function($scope, $state, $ionicPopup){
	$scope.health = {};
	$scope.bmicalc = function(){
		var x = $scope.health.height/100;
		var y = $scope.health.weight * 0.453592;
		$scope.bmi = (y/(x *x)) || '';
		console.log($scope.bmi);
	}
	$scope.calculate = function(){
		console.log('calculate button got click event');
		console.log($scope.health.weight);
		//var myPopup = this;
		var myPopup = $ionicPopup.show({
      template: "{{0.5 * $scope.health.weight + 16}}",
      title: 'Result',
      scope: $scope,
      buttons: [
        {
          text: '<b>Done</b>',
          type: 'button-positive',
          onTap: function() {
						if(angular.isUndefined($scope.health.weight)){
							console.log("the weight is undefined");
						}
            $state.go('app.record');
          }
        }
      ]
    }).then(function(res){
			console.log(res);
			console.log($scope.health.weight);
		});
	}
})

.controller('RecordCtrl', function($scope){

})
