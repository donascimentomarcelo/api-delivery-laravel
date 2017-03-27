<?php

namespace Delivery\Http\Requests;

use Illuminate\Http\Request as HttpRequest;

class CheckoutRequest extends Request
{
   /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(HttpRequest $request)
    {
        $rules = [
            'cupom_code'=>'exists:cupoms,code,used,0'  
        ];

        $this->buildRulesItems(0, $rules);
        //chama o metodo e ja seta a validação com a posição 0  
        $items = $request->get('items',[]);
        //verifica s tem o items get('items',[]) se tiver blz, s n , vira um array vazio no []
        $items = !is_array($items) ? [] :$items;
        //se items n for um array, então seja um array, se n seja item(continua como array)

        foreach ($items as $key => $value) 
        {
            $this->buildRulesItems($key, $rules);            
        }

        return $rules;

        // return [
        //     //verifica se o cupom sexiste e se foi usado
        //     'items.0.product_id'=>'required',
        //     'items.0.qtd'=>'required'
        // ];
    }

    public function buildRulesItems($key, array &$rules)
    {
        //&$rules passa array por referencia.
        //mesmo que o metodo morra o array n é mudado
         $rules["items.$key.product_id"] = 'required';
         $rules["items.$key.qtd"] = 'required';
    }
}
