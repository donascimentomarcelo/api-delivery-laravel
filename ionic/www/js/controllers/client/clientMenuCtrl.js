appCtrl.controller('ClientMenuCtrl', [
	'$scope', '$state', 'userDataAPIService', 
		 function($scope, $state, userDataAPIService){
		 	
		 	$scope.user = userDataAPIService.get();
    
}]);