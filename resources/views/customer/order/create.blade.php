@extends('app')

@section('content')

<div class="container">
	<h3>Novo Pedido</h3>
	<br>
	<br>
	@include('errors._check')

	<div class="container">
	{!! Form::open(['route'=>'admin.checkout.store', 'class'=>'form'])!!}
		
	{{!! Form::close() !!}}
	</div>

@endsection