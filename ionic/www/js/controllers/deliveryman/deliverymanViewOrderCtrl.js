appCtrl.controller('DeliverymanViewOrderCtrl', [
	'$scope', '$stateParams', '$ionicLoading', 'orderDeliverymanAPIService', '$cordovaGeolocation', '$ionicPopup',
		 function($scope, $stateParams, $ionicLoading, orderDeliverymanAPIService, $cordovaGeolocation, $ionicPopup){
		 	var watch;
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

		 	$scope.goToDelivery = function(){
		 		$ionicPopup.alert({
		    			title: 'Advertência',
		    			template: 'Para parar a localização de OK.'
		    		}).then(function(){
		    			// chama uma promessa que qnd o OK for selecionado ele mata a posição chamando o stopWatchPosition()
		    			stopWatchPosition();
		    		});
		 		orderDeliverymanAPIService.updateStatus({id: $stateParams.id}, {status: 1}, function(){
		 			var watchOptions = {
		 				timeout: 3000,
		 				enableHighAccuracy: false
		 			};
		 			watch = $cordovaGeolocation.watchPosition(watchOptions);
		 			watch.then(null, 
		 					// esse null é o success
		 				function(responseError){
		 					// error
		 				},
		 				function(position){
		 					// esse function representa o notify
		 					orderDeliverymanAPIService.geo({id: $stateParams.id},{
		 						lat: position.coords.latitude,
		 						long: position.coords.longitude,
		 					})
		 				});
		 		});
		 	};

		 	function stopWatchPosition(){
		 		if(watch && typeof watch == 'object' && watch.hasOwnProperty('watchID')){
		 			// hasOwnProperty verifica se tem uma propriedade no objeto
		 			// hasOwnProperty é uma função do js e nesse caso verifica se ha a propriedade watchID
		 			$cordovaGeolocation.clearWatch(watch.watchID);
		 		}
		 	}
		 	
}]);


