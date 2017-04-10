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
		 	
		 	$scope.doRefresh = function(){
		 		getOrders().then(function(data){
		 			$scope.items = data.data;
		 			$scope.$broadcast('scroll.refreshComplete');
		 			// $broadcast sinal de chamada de evento
		 		},function(dataError){
		 			$scope.$broadcast('scroll.refreshComplete');
		 		});
		 	};

		 	$scope.openOrderDetail = function(order){
		 		$state.go('client.view_order',{id: order.id});
		 	};

		 	function getOrders()
		 	{
			 	return orderAPIService.query({
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


