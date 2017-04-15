appCtrl.controller('DeliverymanViewOrderCtrl', [
	'$scope', '$stateParams', '$ionicLoading', 'orderDeliverymanAPIService', 
		 function($scope, $stateParams, $ionicLoading, orderDeliverymanAPIService){
		 	
		 	$scope.order = {};
		 	
		 	$ionicLoading.show({
		 		content: 'Loading',
			    animation: 'fade-in',
			    showBackdrop: true,
			    maxWidth: 200,
			    showDelay: 0
		 	});
		 	
		 	orderDeliverymanAPIService.get({id: $stateParams.id, include: "items, cupom"}, function(data){
		 		$scope.order = data.data;
		 		$ionicLoading.hide();
		 	},function(dataError){
		 		$ionicLoading.hide();
		 	});
		 	
}]);


