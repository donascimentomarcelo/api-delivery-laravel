<?php

namespace Delivery\Http\Controllers\Api\Deliveryman;

use Delivery\Http\Controllers\Api\Deliveryman;
use Delivery\Http\Controllers\Controller;
use Delivery\Http\Requests;
use Delivery\Repositories\OrderRepository;
use Delivery\Repositories\UserRepository;
use Delivery\Services\OrderService;
use Illuminate\Http\Request;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class DeliverymanCheckoutController extends Controller
{
    private $orderRepository;
    private $userRepository;
    private $orderService;

    public function __construct(OrderRepository $orderRepository, UserRepository $userRepository, OrderService $orderService)
    {
        $this->orderRepository = $orderRepository;
        $this->userRepository = $userRepository;
        $this->orderService = $orderService;
    }

    public function index()
    {
        $id = Authorizer::getResourceOwnerId();
        $orders = $this->orderRepository->with('items')->scopeQuery(function($query) use($id){
            return $query->where('user_deliveryman_id', '=', $id);
        })->paginate();

        return $orders;
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $id = Authorizer::getResourceOwnerId();
        $clientId = $this->userRepository->find($id)->client->id;
        $data['client_id'] = $clientId;
        $orders = $this->orderService->create($data);
        $o = $this->orderRepository->with('items')->find($orders->id);
        return $o;
    }

    public function show($id)
    {
        $idDeliveryman = Authorizer::getResourceOwnerId();
        return $this->orderRepository->getByDeliveryman($id,$idDeliveryman);
       
    }
}
