appService.factory('userDataAPIService',['$localStorage',
			 function($localStorage){
			 	var key = 'user';
			 	return{
			 		set: function(value){
			 			return $localStorage.setObject(key, value);
			 		},
			 		get: function(){
			 			return $localStorage.getObject(key);
			 		}
		 	};
}]);