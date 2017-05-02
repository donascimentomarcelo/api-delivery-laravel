appCtrl.controller('ClientViewViewDeliveryCtrl', [
	'$scope', '$stateParams', '$ionicLoading', 'orderAPIService', 
		 function($scope, $stateParams, $ionicLoading, orderAPIService){
		 	
		 	$scope.order = {};
		 	$scope.map = {
		 		center:{
		 			latitude: -23.444,
		 			longitude: -46.444
		 		},
		 		zoom: 12
		 	}
		 	$ionicLoading.show({
		 		content: 'Loading',
			    animation: 'fade-in',
			    showBackdrop: true,
			    maxWidth: 200,
			    showDelay: 0
		 	});

		 	$scope.markers = [
		 		{
		 			id: 1,
		 			coords: {
		 				latitude: -23.444,
		 				longitude: -46.444
		 			},
		 			options:{
		 				title:'Meu titulo',
		 				labelContent: 'Meu marcador'
		 			}
		 		}
		 	]
		 	
		 	orderAPIService.get({id: $stateParams.id, include: "items, cupom"}, function(data){
		 		$scope.order = data.data;
		 		$ionicLoading.hide();
		 	},function(dataError){
		 		$ionicLoading.hide();
		 	});
		 	
}]);


