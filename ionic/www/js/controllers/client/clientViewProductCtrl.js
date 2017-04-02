appCtrl.controller('ClientViewProductCtrl', [
	'$scope', '$state', 'appConfig','$resource',
		 function($scope, $state, appConfig, $resource){

		 	var product = $resource(appConfig.baseUrl+'/api/client/products',{},{
		 		query:{
		 			idArray:false
		 		}
		 	});

		 	product.query({}, function(data){
		 		console.log(data);
		 	});
    
}]);