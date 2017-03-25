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
    public function getByDeliveryman($id, $idDeliveryman)
    {
        $result = $this->with(['client','items','cupom'])->findWhere([
            'id'=>$id,
            'user_deliveryman_id'=>$idDeliveryman
            ]);
        if($result instanceof Collection){
            //faço esse if pq o resultado do findwhere é uma coleção
            $result = $result->first();
            if($result)
            { 
                $result->items->each(function($item){
                    $item->product;
                });
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
}
