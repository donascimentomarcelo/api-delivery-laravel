@extends('app')

@section('content')

<div class="container">
	<h3>Clientes</h3>
	<br>
	<a href="{{ route('admin.clients.create')}}" class="btn btn-default">Novo Cliente</a>
	<br>
	<table class="table">
		<thead>
			<tr>
				<th>ID</th>
				<th>Nome</th>
				<th>Ação</th>
			</tr>
		<tbody>
			@foreach($clients as $client)
			<tr>
				<td>{{$client->id}}</td>
				<td>{{$client->user->name}}</td>
				<td>
					<a href="{{route('admin.clients.edit',['id'=>$client->id])}}" class="btn btn-default btn-sm">Editar</a>
					
				</td>
			</tr>
			@endforeach
		</tbody>
		</thead>
	</table>
	{!! $clients->render() !!}

</div>

@endsection
