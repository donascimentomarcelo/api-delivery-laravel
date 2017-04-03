appService.factory('$localStorage',['$window',
			 function($window){

			 	return{
			 		set: function(key, value){
			 			$window.localStorage[key] = value;
			 			return $window.localStorage[key];
			 		},
			 		get: function(key, defaultValue){
			 			return $window.localStorage[key] || defaultValue;
			 			// retorna $window.localStorage[key] se existir key. Se n existir retorna o defaultValue
			 		},
			 		setObject: function(key, value){
			 			$window.localStorage[key] = JSON.stringify(value);
			 			// qnd for um objeto eu converto para json JSON.stringify
			 			return this.getObject(key);
			 		},
			 		getObject: function(key){
			 			return JSON.parse($window.localStorage[key] || null);
			 			//Se n tiver o $window.localStorage[key] retorna null
			 		}
		 	};
}]);