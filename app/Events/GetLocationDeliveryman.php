<?php

namespace Delivery\Events;

use Delivery\Events\Event;
use Delivery\Models\Geo;
use Delivery\Models\Order;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class GetLocationDeliveryman extends Event implements ShouldBroadcast
{
    use SerializesModels;

    public $geo;

    private $model;
    // private $geo;
    // private $order;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Geo $geo, Order $order)
    {
        $this->geo = $geo;
        $this->model = $order;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [$this->model->hash];
    }
}
