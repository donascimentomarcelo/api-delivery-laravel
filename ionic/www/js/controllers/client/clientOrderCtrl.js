appCtrl.controller('ClientOrderCtrl', [
	'$scope', '$state', '$ionicLoading', 'orderAPIService', 
		 function($scope, $state, $ionicLoading, orderAPIService){
		 	
		 	$scope.items = [];

		 	$ionicLoading.show({
		 		content: 'Loading',
			    animation: 'fade-in',
			    showBackdrop: true,
			    maxWidth: 200,
			    showDelay: 0
		 	});
		 	
		 	orderAPIService.query({id: null}, function(data){
		 		$scope.items = data.data;
		 		$ionicLoading.hide();
		 	},function(dataError){
		 		$ionicLoading.hide();
		 	});
    
}]);