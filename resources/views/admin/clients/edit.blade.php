@extends('app')

@section('content')

<div class="container">
	<h3>Editar Clientes: {{$clients->user->name}}</h3>
	<br><br>
	
	@include('errors._check')
	
	{!! Form::model($clients, ['route'=>['admin.clients.update', $clients->id]])!!}

	 @include('admin.clients._form')

	 <div class="form-group">
	 	{!! Form::submit('Salvar Cliente', ['class'=>'btn btn-primary'])!!}
	 </div>

	{!! Form::close()!!}

</div>

@endsection