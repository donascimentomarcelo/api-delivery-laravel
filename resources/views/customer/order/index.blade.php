@extends('app')

@section('content')

<div class="container">
	<h3>Novo Pedido</h3>
	<br>
	<br>
	@include('errors._check')
	<a href="{{route('customer.order.create')}}" class="btn btn-default">Novo Pedido</a>
	<br>
	<br>
	<table class="table table-bordered">
		<thead>
			<tr>
				<th>ID</th>
				<th>Total</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
		@foreach($orders as $order)
			<tr>
				<td>{{$order->id}}</td>
				<td>{{$order->total}}</td>
				<td>{{$order->status}}</td>
			</tr>
		@endforeach
		</tbody>
	</table>
	{!! $orders->render() !!}
@endsection