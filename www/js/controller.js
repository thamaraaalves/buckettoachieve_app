angular.module('starter.controllers', ['firebase'])

.controller('HomeCtrl',['$scope','$firebaseAuth','$state','SessionData', function($scope,$firebaseAuth,$state,SessionData) {

	$scope.login={};
	var firebaseObj = new Firebase("https://buckettoachieve.firebaseio.com/");
    var loginObj = $firebaseAuth(firebaseObj);

	$scope.signin = function(){
		var username = $scope.login.username;
		var password = $scope.login.password;

    	loginObj.$authWithPassword({
            email: username,
            password: password
        })
        .then(function(user) {
            //Success callback
            console.log('Authentication successful');
             $state.go('userHome');
						 SessionData.setUser(username);

        }, function(error) {
            //Failure callback
            console.log('Authentication failure');
        });
	}
		$scope.showSignUp = function(){
		        $state.go('signup');
		}
}])

.controller('UserHomeCtrl', ['$scope','$state','$firebase', function($scope,$state,$firebase){
		$scope.showAddWish = function(){
	       $state.go('addWish');
	  }

		var firebaseObj = new Firebase("https://buckettoachieve.firebaseio.com/");

		var sync = $firebase(firebaseObj);
		$scope.wishes = sync.$asArray();
}])

.controller('SignUpCtrl', ['$scope','$state','$firebaseAuth', function($scope,$state,$firebaseAuth){

	 // Code will be here
		 $scope.showSignIn = function(){
		        $state.go('home');
		}

		$scope.login={};

		var firebaseObj = new Firebase("https://buckettoachieve.firebaseio.com/");

		var loginObj = $firebaseAuth(firebaseObj);

		$scope.signup = function(){
		        var email = $scope.login.email;
		        var password = $scope.login.password;

		        loginObj.$createUser(email, password)
		            .then(function() {
		                // do things if success
		                console.log('User creation success');
		                $state.go('home');
		            }, function(error) {
		                // do things if failure
		                console.log(error);
		            });
		}
}])

.controller('AddWishCtrl', ['$scope','$state','SessionData','$firebase', function($scope,$state,SessionData,$firebase){

	$scope.user = {};

	$scope.add = function(){
	        var firebaseObj = new Firebase("https://buckettoachieve.firebaseio.com/");
	        var fb = $firebase(firebaseObj);
	        var user = SessionData.getUser();

	        fb.$push({
	            wish: $scope.user.wish,
	            email: user
	        }).then(function(ref) {
	            console.log(ref);
	            $state.go('userHome');
	        }, function(error) {
	            console.log("Error:", error);
	        });
	    }
}])

.service('SessionData', function() {
    var user = '';

    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        }
    };
});
