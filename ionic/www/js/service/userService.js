appService.factory('userAPIService',
	 ['$resource', 'appConfig',
		function ($resource, appConfig) {

		return	$resource(appConfig.baseUrl+'/api/authenticated',{},{
			 		query:{
			 			isArray:false
			 		},
			 		authenticated: {
			 			method:'GET',
			 			url:appConfig.baseUrl+'/api/authenticated'
			 		}
			 	});

}])