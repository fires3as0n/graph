@extends('layouts.month'){{--{{ dd($cells) }}--}}{{--{{ dd($related) }}--}}

@section('CSS')
	<link rel="stylesheet" type="text/css" href="/css/month.css"/>
@endsection


@section('content')
	<div class="container">
		<div class="row">
			@for ($table=0; $table<sizeof($cells); $table++)
				<div class="col-12 col-sm-6 no-gutters">
					<table class="table table-bordered">
						@for ($row=0; $row<sizeof($cells[$table]); $row++)
							<tr>
								@for($column=0; $column < sizeof($cells[$table][$row]); $column++)
									<td class="{{$cells[$table][$row][$column]['class']}}" @if ( array_key_exists("id", $cells[$table][$row][$column]) )                                        id="{{$cells[$table][$row][$column]["id"]}}"
										@endif
									>
										{!! $cells[$table][$row][$column]["data"] !!}
									</td>
								@endfor
							</tr>
						@endfor
					</table>
				</div>
			@endfor
		</div>
	</div>

	<div id="selector">
		<div data-relation="offday">
			<img src="/img/offday_button.png"/>
		</div>
		<div data-relation="workday">
			<img src="/img/workday_button.png"/>
		</div>
		<div data-relation="halfday">
			<img src="/img/halfday_button.png"/>
		</div>
		<div data-relation="objday">
			<img src="/img/objday_button.png"/>
		</div>
		<div data-relation="illday">
			<img src="/img/illday_button.png"/>
		</div>
		<div data-relation="customday">
			<img src="/img/customday_button.png"/>
		</div>
	</div>

@endsection

@section('head_JS')
	<script type="text/javascript">
		window.users = {!! json_encode($users) !!};
		window.csrf_token = "{{ csrf_token() }}";
	</script>
@endsection

@section('foot_JS')
	<script src="/js/month.js"></script>
@endsection