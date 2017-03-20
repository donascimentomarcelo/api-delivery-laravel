<?php

namespace Delivery\Http\Controllers;

use Delivery\Http\Controllers\Controller;
use Delivery\Http\Requests;
use Delivery\Http\Requests\AdminCategoryRequest;
use Delivery\Repositories\OrderRepository;
use Delivery\Repositories\UserRepository;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
	private $orderRepository;

	public function __construct(OrderRepository $orderRepository)
	{
		$this->orderRepository = $orderRepository;
	}

    public function index()
    {
        $orders = $this->orderRepository->paginate(5);

        return view('admin.orders.index', compact('orders'));
    }

    public function edit($id, UserRepository $userRepository)
    {
    	$list_status = [0 => 'Pendente', 1 => 'A caminho', 2 => 'Entregue'];

    	$order = $this->orderRepository->find($id);

    	// $deliveryman = $userRepository->findWhere(['role'=>'deliveryman']);
    	$deliveryman = $userRepository->getDeliverymen();
    	//O getDeliverymen é criado no userRepositoryEloquent

    	return view('admin.orders.edit', compact('order','list_status', 'deliveryman'));
    }

    public function update(Request $request, $id)
    {
    	$all = $request->all();
    	$this->orderRepository->update($all,$id);

    	return redirect()->route('admin.orders.index');
    }
}
