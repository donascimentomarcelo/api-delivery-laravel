appCtrl.controller('DeliverymanMenuCtrl', [
	'$scope', '$state', 'userDataAPIService', 
		 function($scope, $state, userDataAPIService){
		 	
		 	$scope.user =  userDataAPIService.get();

}]);