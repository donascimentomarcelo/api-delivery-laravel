<?php

namespace Delivery\Transformers;

use Delivery\Models\OrderItem;
use Delivery\Transformers\ProductTransformer;
use League\Fractal\TransformerAbstract;

/**
 * Class OrderItemsTransformer
 * @package namespace Delivery\Transformers;
 */
class OrderItemTransformer extends TransformerAbstract
{
    protected $defaultIncludes = ['product'];

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
            'qtd'        => (int) $model->qtd,
            'price'      => (float) $model->price,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }

    public function includeProduct(OrderItem $model)
    {
        return $this->item($model->product, new ProductTransformer());
    }
}
