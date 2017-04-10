appCtrl.controller('ClientMenuCtrl', [
	'$scope', '$state', '$ionicLoading', 'userAPIService', 
		 function($scope, $state, $ionicLoading, userAPIService){
		 	
		 	$scope.user =  {
		 		name: ''
		 	};

		 	$ionicLoading.show({
		 		content: 'Loading',
			    animation: 'fade-in',
			    showBackdrop: true,
			    maxWidth: 200,
			    showDelay: 0
		 	});
		 	
		 	userAPIService.authenticated({}, function(data){
		 		$scope.user = data.data;
		 		$ionicLoading.hide();
		 	},function(dataError){
		 		$ionicLoading.hide();
		 	});
    
}]);