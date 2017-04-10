appCtrl.controller('ClientViewOrderCtrl', [
	'$scope', '$stateParams', '$ionicLoading', 'orderAPIService', 
		 function($scope, $stateParams, $ionicLoading, orderAPIService){
		 	
		 	$scope.order = {};
		 	
		 	$ionicLoading.show({
		 		content: 'Loading',
			    animation: 'fade-in',
			    showBackdrop: true,
			    maxWidth: 200,
			    showDelay: 0
		 	});
		 	
		 	orderAPIService.get({id: $stateParams.id, include: "items, cupom"}, function(data){
		 		$scope.order = data.data;
		 		$ionicLoading.hide();
		 	},function(dataError){
		 		$ionicLoading.hide();
		 	});
		 	
}]);


