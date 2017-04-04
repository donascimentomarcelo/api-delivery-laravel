appCtrl.controller('ClientCheckoutCtrl', [
	'$scope', '$state', '$cart', 'Order', '$ionicLoading', '$ionicPopup',
		 function($scope, $state, $cart, Order, $ionicLoading, $ionicPopup){
			 
			 var cart = $cart.get();
			 
			 $scope.items = cart.items;
			 $scope.total = cart.total;
			 
			 $scope.removeIndex = function(i){
			 	$cart.removeItems(i);
			 	$scope.items.splice(i, 1);
			 	$scope.total = $cart.get().total;
			 };

			 $scope.openProductDetail = function(i){
			 	$state.go('client.checkout_item_detail', {index: i});
			 };

			 $scope.openListProducts = function(){
		    	$state.go('client.view_products');
		    };

		    $scope.save = function(){
		    	var items = angular.copy($scope.items);
		    	angular.forEach(items, function(item){
		    		item.product_id = item.id;
		    	});
		    	$ionicLoading.show({
		    		template: 'Carregando...'
		    	});
		    	Order.save({id:null},{items:items}, function(){
		    		$ionicLoading.hide();
		    	},function(responseError){
		    		$ionicLoading.hide();
		    		$ionicPopup.alert({
		    			title: 'Advertência',
		    			template: 'Pedido não realizado - Tente novamente.'
		    		});
		    	});
		    	//nesse caso passa o id como null pq é obrigatorio passar parametro nessa rota
		    };
}]);