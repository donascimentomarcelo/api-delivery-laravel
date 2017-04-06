appCtrl.controller('ClientCheckoutCtrl', [
	'$scope', '$state', '$cart', 'orderAPIService', '$ionicLoading', '$ionicPopup', 'cupomAPIService', '$cordovaBarcodeScanner',
		 function($scope, $state, $cart, orderAPIService, $ionicLoading, $ionicPopup, cupomAPIService, $cordovaBarcodeScanner){
			 
			
			 var cart = $cart.get();

			 $scope.cupom = cart.cupom;
			 $scope.items = cart.items;
			 $scope.total = $cart.getTotalFinal();
			 
			 $scope.removeIndex = function(i){
			 	$cart.removeItems(i);
			 	$scope.items.splice(i, 1);
			 	$scope.total = $cart.getTotalFinal();
			 };

			 $scope.openProductDetail = function(i){
			 	$state.go('client.checkout_item_detail', {index: i});
			 };

			 $scope.openListProducts = function(){
		    	$state.go('client.view_products');
		    };

		    $scope.save = function(){
		    	var object = {items: angular.copy($scope.items)};
		    	angular.forEach(object.items, function(item){
		    		item.product_id = item.id;
		    	});
		    	$ionicLoading.show({
		    		// template: 'Carregando...'
		    		content: 'Loading',
				    animation: 'fade-in',
				    showBackdrop: true,
				    maxWidth: 200,
				    showDelay: 0
		    	});
		    	
		    	if($scope.cupom.value)
		    	{
		    		object.cupom_code = $scope.cupom.code;
		    	}

		    	orderAPIService.save({id:null}, object, function(data){
		    		$ionicLoading.hide();
		    		$state.go('client.checkout_successful');
		    	},function(responseError){
		    		$ionicLoading.hide();
		    		$ionicPopup.alert({
		    			title: 'Advertência',
		    			template: 'Pedido não realizado - Tente novamente.'
		    		});
		    	});
		    	//nesse caso passa o id como null pq é obrigatorio passar parametro nessa rota
		    };

		    $scope.readBarCode = function(){
		    	$cordovaBarcodeScanner
		    	.scan()
		    	.then(function(barcodeData) {
		    		getValueCupom(barcodeData.text);
			    }, function(error) {
			        $ionicPopup.alert({
		    			title: 'Advertência',
		    			template: 'Não foi possível ler o código de barras.'
		    		});
			    });

		    };

		    $scope.removeCupom = function(){
		    	$cart.removeCupom();
		    	$scope.cupom = $cart.get().cupom;
		    	$scope.total = $cart.getTotalFinal();
		    };

		    function getValueCupom(code){
		    	$ionicLoading.show({
		    		content: 'Loading',
				    animation: 'fade-in',
				    showBackdrop: true,
				    maxWidth: 200,
				    showDelay: 0
		    	});
		    	cupomAPIService.get({code: code}, function(data){
		    		$cart.setCupom(data.data.code, data.data.value);
		    		$scope.cupom = $cart.get().cupom;
		    		$scope.total = $cart.getTotalFinal();
		    		$ionicLoading.hide();
		    	}, function(responseError){
		    		$ionicLoading.hide();
		    		$ionicPopup.alert({
		    			title: 'Advertência',
		    			template: 'Cupom inválido'
		    		});
		    	});
		    };
}]);