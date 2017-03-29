<?php

namespace Delivery\Repositories;

use Delivery\Models\Order;
use Delivery\Repositories\OrderRepository;
use Delivery\Validators\OrderValidator;
use Illuminate\Database\Eloquent\Collection;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class OrderRepositoryEloquent
 * @package namespace Delivery\Repositories;
 */
class OrderRepositoryEloquent extends BaseRepository implements OrderRepository
{

    protected $skipPresenter = true;

    public function getByDeliveryman($id, $idDeliveryman)
    {
        $result = $this->with(['client','items','cupom'])->findWhere([
            'id'=>$id,
            'user_deliveryman_id'=>$idDeliveryman
            ]);
        if($result instanceof Collection)
        {
            //faço esse if pq o resultado do findwhere é uma coleção
            $result = $result->first();
            // if($result)
            // { 
            //     $result->items->each(function($item){
            //         $item->product;
            //     });
            // }
        }
        else
        {
            //se não for uma instancia da collection (instanceof Collection), sera um array. Aqui verifico se ha algo dentro do result[data], se houver eu retiro o [] para que a serealização seja apenas de objetos json
            if(isset($result['data']) && count($result['data']) == 1)
            {
                $result = [
                    'data' => $result['data'][0]
                ];
            }
            else
            {
                throw new ModelNotFoundException("Order não existe.");
                
            }
        }

        return $result;
    }
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Order::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function presenter()
    {
        return \Delivery\Presenters\OrderPresenter::class;
    }
}
