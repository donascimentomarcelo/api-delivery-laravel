<?php

namespace Delivery\Transformers;

use League\Fractal\TransformerAbstract;
use Delivery\Models\OrderItem;

/**
 * Class OrderItemsTransformer
 * @package namespace Delivery\Transformers;
 */
class OrderItemTransformer extends TransformerAbstract
{

    /**
     * Transform the \OrderItems entity
     * @param \OrderItems $model
     *
     * @return array
     */
    public function transform(OrderItem $model)
    {
        return [
            'id'         => (int) $model->id,
            'product_id' => (int) $model->product_id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
