appCtrl.controller('DeliverymanOrderCtrl', [
	'$scope', '$state', '$ionicLoading', 'orderDeliverymanAPIService', 
		 function($scope, $state, $ionicLoading, orderDeliverymanAPIService){
		 	
		 	$scope.items = [];

		 	$ionicLoading.show({
		 		content: 'Loading',
			    animation: 'fade-in',
			    showBackdrop: true,
			    maxWidth: 200,
			    showDelay: 0
		 	});
		 	
		 	$scope.doRefresh = function(){
		 		getOrders().then(function(data){
		 			$scope.items = data.data;
		 			$scope.$broadcast('scroll.refreshComplete');
		 		},function(dataError){
		 			$scope.$broadcast('scroll.refreshComplete');
		 		});
		 	};

		 	$scope.openOrderDetail = function(order){
		 		$state.go('deliveryman.view_order',{id: order.id});
		 	};

		 	function getOrders()
		 	{
			 	return orderDeliverymanAPIService.query({
			 		id: null,
			 		orderBy: 'created_at',
			 		sortedBy: 'desc'
			 	}).$promise;
		 	};

		 	getOrders().then(function(data){
		 		$scope.items = data.data;
		 		$ionicLoading.hide();
		 	},function(dataError){
		 		$ionicLoading.hide();
		 	});

}]);


