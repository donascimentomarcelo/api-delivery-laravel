appCtrl.controller('LoginCtrl', [
	'$scope', 'OAuth', '$cookies', '$ionicPopup', '$state', '$ionicLoading',
		 function($scope, OAuth, $cookies, $ionicPopup, $state, $ionicLoading){
	
	$scope.user = {
		username:'',
		password:''
	};

      $scope.login = function(){
            $ionicLoading.show({
                  content: 'Loading',
                  animation: 'fade-in',
                  showBackdrop: true,
                  maxWidth: 200,
                  showDelay: 0
                  });
      	OAuth.getAccessToken($scope.user).then(function(data){
                  $ionicLoading.hide();
      		$state.go('client.checkout');
      		// $cookies.getObject('token');
      	},function(responseError){
                  $ionicLoading.hide();
      		$ionicPopup.alert({
      			title:'Advertência',
      			template:'Login e/ou senha inválidos'
      		});
      		console.debug(responseError);
      	});
      };
    
}]);