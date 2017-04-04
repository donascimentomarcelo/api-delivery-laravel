appService.factory('cupomAPIService',
	 ['$resource', 'appConfig',
		function ($resource, appConfig) {

		return	$resource(appConfig.baseUrl+'/api/cupom/:code',{code:'@code'},{
			 		query:{
			 			isArray:false
			 		}
			 	});

}])