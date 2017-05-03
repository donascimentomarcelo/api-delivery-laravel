<?php

namespace Delivery\Transformers;

use Delivery\Models\Order;
use Illuminate\Database\Eloquent\Collection;
use League\Fractal\TransformerAbstract;

/**
 * Class OrderTransformer
 * @package namespace Delivery\Transformers;
 */
class OrderTransformer extends TransformerAbstract
{
    // protected $defaultIncludes = ['cupom','items'];
    protected $availableIncludes = ['cupom','items','client'];
    /**
     * Transform the \Order entity
     * @param \Order $model
     *
     * @return array
     */
    public function transform(Order $model)
    {
        return [
            'id'           => (int)   $model->id,
            'total'        => (float) $model->total,
            'product_names'=> $this->getArrayProductNames($model->items),
            'status'       => $model->status,
            'hash'         => $model->hash,
            'created_at'   => $model->created_at,
            'updated_at'   => $model->updated_at
        ];
    }

    protected function getArrayProductNames(Collection $items)
    {
        $names = [];
        foreach ($items as $item) {
            $names[] = $item->product->name;
        }
        return $names;
    }

    /* includeCupom é responsável pesa serialização do relacionamento das ordens e includeItems pelo relacionamento dos items*/
    public function includeCupom(Order $model)
    {
        if(!$model->cupom)
        {
            return null;
        }
        return $this->item($model->cupom, new CupomTransformer());
    }

    public function includeItems(Order $model)
    {
        if(!$model->items)
        {
            return null;
        }
        return $this->collection($model->items, new OrderItemTransformer());
    }

    public function includeClient(Order $model)
    {
        if(!$model->client)
        {
            return null;
        }
        return $this->item($model->client, new ClientTransformer());
    }

}
