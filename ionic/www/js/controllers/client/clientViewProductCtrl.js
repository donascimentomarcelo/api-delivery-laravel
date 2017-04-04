appCtrl.controller('ClientViewProductCtrl', [
	'$scope', '$state', 'Product', '$ionicLoading', '$cart', 
		 function($scope, $state, Product, $ionicLoading, $cart){
		 	
		 	$localStorage.setObject('cart',{
		 		name:'ionic',
		 		version:'1.1.1'
		 	});

		 	$scope.products = [];
		 	
		 	$ionicLoading.show({
		 		template:'Carregando...'
		 	});
		 	
		 	Product.query({}, function(data){
		 		$scope.products = data.data;
		 		$ionicLoading.hide();
		 	},function(dataError){
		 		$ionicLoading.hide();
		 	});

		 	$scope.addItem = function(item){
		 		// cart.items.push(item);
		 		// $state.go('client.checkout');
		 		item.qtd = 1;
		 		$cart.addItem(item);
		 		$state.go('client.checkout');
		 	};
    
}]);