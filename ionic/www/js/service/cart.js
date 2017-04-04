appService.service('$cart',['$localStorage',
		function($localStorage){
			var key = 'cart', cartAux = $localStorage.getObject(key);
			// verifica se tem algum valor no carrinho antes de inicializar, se n tiver ele zera o valor e atribui um array vazio
			if(!cartAux){
				initCart();
			}

			this.clear = function(){
				initCart();
			};

			this.get = function(){
				return $localStorage.getObject(key);
			};

			this.getItem = function(i){
				return this.get().items[i];
				// pega o carrinho com this.get e acessa a variavel items e chama o indice [i]
			};

			this.addItem = function(item){
				var cart = this.get(), itemAux, exists = false;
				for(var index in cart.items){
					itemAux = cart.items[index];
					if(itemAux.id == item.id){
						itemAux.qtd = item.qtd + itemAux.qtd;
						itemAux.subtotal = calculateSubTotal(itemAux);
						exists = true;
						break;
						// verifica se o tem o item, se tiver, soma a qtdd e soma ao subtotal
					}
				}
				if(!exists){
					item.subtotal = calculateSubTotal(item);
					cart.items.push(item);
				}
				cart.total = getTotal(cart.items);
				$localStorage.setObject(key, cart);
			};

			this.removeItems = function(i){
				var cart = this.get();
				cart.items.splice(i, 1);
				cart.total = getTotal(cart.items);
				$localStorage.setObject(key, cart);
			};

			this.updateQtd = function(i, qtd){
				var cart = this.get(),
					itemAux = cart.items[i];
				itemAux.qtd = qtd;
				itemAux.subtotal = calculateSubTotal(itemAux);
				cart.total = getTotal(cart.items);
				$localStorage.setObject(key, cart);
			};
			
			this.setCupom = function(code, value){
				var cart = this.get();
				cart.cupom = {
					code: code,
					value: value
				};
				$localStorage.setObject(key, cart);
			};

			this.removeCupom = function(){
				var cart = this.get();
				cart.cupom = {
					code: null,
					value: null
				};
				$localStorage.setObject(key, cart);
			};

		    this.getTotalFinal = function(){
		    	var cart = this.get();
		    	return cart.total - (cart.cupom.value || 0);
		    	// se tiver cupom, ele pega o total de subtrai por cart.cupom.value. Se não, subtrai por 0

		    };

			function calculateSubTotal(item){
				return item.price * item.qtd;
			};

			function getTotal(items){
				var sum = 0;
				angular.forEach(items, function(item){
					sum += item.subtotal;
				});
				return sum;
			};

			function initCart(){
				$localStorage.setObject(key,{
					items: [],
					total: 0,
					cupom:{
						code:null,
						value:null
					}
				});
			};

}]);