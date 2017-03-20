@extends('app')

@section('content')

<div class="container">
	<h3>Cupons</h3>
	<br>
	<a href="{{ route('admin.cupoms.create')}}" class="btn btn-default">Novo Cupom</a>
	<br>
	<table class="table">
		<thead>
			<tr>
				<th>ID</th>
				<th>Código</th>
				<th>Valor</th>
				<th>Ação</th>
			</tr>
		<tbody>
			@foreach($cupoms as $cupom)
			<tr>
				<td>{{$cupom->id}}</td>
				<td>{{$cupom->code}}</td>
				<td>{{$cupom->value}}</td>
				<td>
					<a href="{{route('admin.cupoms.edit',['id'=>$cupom->id])}}" class="btn btn-default btn-sm">Editar</a>
				</td>
			</tr>
			@endforeach
		</tbody>
		</thead>
	</table>
	{!! $cupoms->render() !!}

</div>

@endsection