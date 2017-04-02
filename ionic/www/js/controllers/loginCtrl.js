appCtrl.controller('LoginCtrl', [
	'$scope', 'OAuth', '$cookies', '$ionicPopup', '$state',
		 function($scope, OAuth, $cookies, $ionicPopup, $state){
	
	$scope.user = {
		username:'',
		password:''
	};

      $scope.login = function(){
      	OAuth.getAccessToken($scope.user).then(function(data){
      		$state.go('home');
      		// $cookies.getObject('token');
      	},function(responseError){
      		$ionicPopup.alert({
      			title:'Advertência',
      			template:'Login e/ou senha inválidos'
      		});
      		console.debug(responseError);
      	});
      };
    
}]);