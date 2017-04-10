appFilter.filter('filterJoin', function(){
	return function(input, joinStr){
		return input.join(joinStr);
		// esse join() pega um array e transforma em uma string
	};
});