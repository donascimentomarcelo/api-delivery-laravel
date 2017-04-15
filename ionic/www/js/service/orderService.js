appService.factory('orderAPIService',
	 ['$resource', 'appConfig',
		function ($resource, appConfig) {

		return	$resource(appConfig.baseUrl+'/api/client/order/:id',{id: '@id'},{
			 		query:{
			 			isArray:false
			 		}
			 	});

}])
.factory('orderDeliverymanAPIService',
	 ['$resource', 'appConfig',
		function ($resource, appConfig) {

		return	$resource(appConfig.baseUrl+'/api/deliveryman/order/:id',{id: '@id'},{
			 		query:{
			 			isArray:false
			 		}
			 	});

}]);