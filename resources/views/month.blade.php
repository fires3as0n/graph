@extends('layout')

{{--{{ dd($cells) }}--}}
{{--{{ dd($related) }}--}}

@section('content')
<h2>
	{{ $month_name }}
	{{ $year }}
</h2>


<div class="container">
	<div class="row">
		@for ($table=0; $table<sizeof($cells); $table++)
			<div class="col-12 col-sm-6 no-gutters">
				<table class="table table-bordered">
					@for ($row=0; $row<sizeof($cells[$table]); $row++)
						<tr>
							@for($column=0; $column < sizeof($cells[$table][$row]); $column++)
								<td
									class="{{$cells[$table][$row][$column]['class']}}"
									@if ( array_key_exists("id", $cells[$table][$row][$column]) )
										id="{{$cells[$table][$row][$column]["id"]}}"
									@endif
								>
									{{$cells[$table][$row][$column]["data"]}}
								</td>
							@endfor
						</tr>
					@endfor
				</table>
			</div>
		@endfor
	</div>
</div>

<div id="selector-2">
	<div data-relation="offday">
		<img src="/img/dark_rectangle.jpg" />
	</div>
	<div data-relation="workday">
		<img src="/img/light_thin_rectangle.jpg" />
	</div>
	<div data-relation="halfday">
		<img src="/img/stroke_thin_rectangle.jpg" />
	</div>
	<div data-relation="objday">
		ОБ
	</div>
	<div data-relation="illday">
		Б
	</div>
	<div data-relation="driveday">
		Р
	</div>
	<div data-relation="customday">
		<i class="far fa-edit"></i>
	</div>
	<div data-relation="close">
		<p>&times;</p>
	</div>
</div>
@endsection

@section('CSS')
<style type="text/css">
	/* Selector using bootstrap */

	#selector-1 {
		width: 300px;
	}

	#selector-1 img {
		width: 40px;
		vertical-align: baseline;
		padding-top: 10px;
	}
	#selector-1 .a {
		font-size: 2em;
		font-weight: 900;
		/*width: 40px;*/
		/*height: 30px;*/
		text-align: center;
		/*display: inline-block;*/
		/*padding-top: 20px;*/
		/*vertical-align: baseline;*/
	}

	/* Selector using CSS only */
	.not-current {
		background-color: rgba(204, 204, 204, 0.1);
	}

	.offday {
		background-color: grey;
	}

	.date.current, .weekday.current {
		font-weight: bold;
	}

	.user {
		font-weight: bold;
	}

	.halfday {
  	background: repeating-linear-gradient(
			-45deg,
			transparent,
			transparent 5px,
			grey 5px,
			grey 7px
 	 );
	}


	#selector-2 {
		margin: 0 auto;
		width: 340px;
		height: 55px;
		font-size: 1.5em;
		font-weight: 900;
		border: 1px solid grey;
		border-radius: 5px;
		padding: 0;
		position: absolute;
		background-color: white;
		display: none;
		box-shadow: 0px 0px 1px 1px rgba(100, 149, 247 , 0.9);
	}

	#selector-2 div {
		display: inline-block;
		width: 40px;
		text-align: center;
		border-left: 1px solid grey;
		margin: 7px 0 0 0;
		padding: 0;
		left: 10px;
		position: relative;
		float: left;
		transition: all .2s;
		cursor: pointer;
	}

	#selector-2 div:first-child {
		border-left: none;
	}

	#selector-2 div:last-child {

		height: 35px;
		/*padding-bottom: -70px;*/
		/*overflow: hidden;*/
		word-wrap: break-word;
		position: relative;
		
	}

	#selector-2 p {
		font-size: 1.8em;
		color: red;
		bottom: 18px;
		text-align: left;
		left: 4px;
		position: relative;
	}

	#selector-2 div div:hover {
		box-shadow: none;
	}


	#selector-2 img {
		width: 30px;
		vertical-align: -8%;
		margin: 0 auto;
	}

	#selector-2 div:hover {
		box-shadow: 0px 0px 1px 1px rgba(100, 149, 247 , 0.5);
		/*text-shadow: 2px 2px 2px rgba(100, 149, 247 , 0.5);*/
	}

	.day:hover {
		border: 2px solid cornflowerblue;
		/*z-index: 100;*/
	}


	.day {
		min-height: 30px;
		min-width: 30px;
	}

	.empty {
		min-height: 30px;
		min-width: 30px;
	}




	@media (max-width: 576px) {
		.day {
			min-height: 20px;
			min-width: 20px;
		}
	}

	.table td {
		padding: 2px;
		vertical-align: baseline;
	}

	.col-12.col-sm-6 {
		padding-top: 10px;
	}

	@media (max-width: 1200px) {
		.container {
			max-width: none;
		}
	}

	.day {
		cursor: pointer;
		transition: all .05s;
	}



	td {
		text-align: center;
	}
	td:first-child {
		text-align: left;
	}
</style>
@endsection

@section('head_JS')
	<script type="text/javascript">
		window.users = {!! json_encode($users) !!}
	</script>
@endsection

@section('foot_JS')
	<script src="/js/month.js"></script>
@endsection