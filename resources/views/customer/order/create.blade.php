@extends('app')

@section('content')

<div class="container">
	<h3>Novo Pedido</h3>
	<br>
	<br>
	@include('errors._check')

	<div class="container">
	{!! Form::open(['class'=>'form'])!!}
		<div class="form-group">
			<label for="">Total:</label>
			<p id="total"></p>
			<a href="#" class="btn btn-default">Novo Item</a>

			<table class="table table-border">
				<thead>
					<tr>
						<th>Produto</th>
						<th>Quantidade</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<select class="form-control" name="item[0][product_id]">
								@foreach($products as $p)
									<option value="{{$p->id}}" data-price="{{$p->price}}">{{$p->name}} --- {{$p->price}}</option>
								@endforeach
							</select>
						</td>
						<td>
							{{!! Form::text('items[0][qtd]',1,['class'=>'form-control'])!!}}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	{{!! Form::close() !!}}
	</div>

@endsection