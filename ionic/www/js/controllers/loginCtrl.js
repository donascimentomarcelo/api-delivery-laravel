appCtrl.controller('LoginCtrl', [
	'$scope', 'OAuth', 'OAuthToken','$cookies', '$ionicPopup', '$state', '$ionicLoading', '$localStorage', 'userAPIService',
		 function($scope, OAuth, OAuthToken, $cookies, $ionicPopup, $state, $ionicLoading, $localStorage, userAPIService){
	
	$scope.user = {
		username:'',
		password:''
	};

      $scope.login = function(){
            $ionicLoading.show({ content: 'Loading',  animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0});

      	var promise = OAuth.getAccessToken($scope.user);
                promise.then(function(data){
                  $ionicLoading.hide();
      		return userAPIService.authenticated({include: 'client'}).$promise;
      		// $cookies.getObject('token');
      	}).then(function(data){
                  $localStorage.set('user', data.data);
                  $state.go('client.checkout');
            }, function(responseError){
                  $ionicLoading.hide();
                  $localStorage.set('user', null);
                  OAuthToken.removeToken();
                  $ionicPopup.alert({
                        title:'Advertência',
                        template:'Login e/ou senha inválidos'
                  });
                  console.debug(responseError);
            });
      };
    
}]);
