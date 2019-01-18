@extends('layout')

{{--{{ dd($data) }}--}}
{{--{{ dd($related) }}--}}

@section('content')
<h2>{{ $data[1][0][5]["month_name"] }}
	{{ $data[1][0][5]["year"] }}
</h2>


<div class="container">
	<div class="row">
		@for ($table=0; $table<sizeof($data); $table++)
			<div class="col-12 col-sm-6 no-gutters">
				<table class="table table-bordered">
					@for ($row=0; $row<sizeof($data[$table]); $row++)
						<tr>
							@for($column=0; $column < sizeof($data[$table][$row]); $column++)
								<td
									{{--Add classes for usernames to use in shrink method--}}
									@if ($row > 1 && $column == 0)
										class="u{{$data[$table][$row][$column]['id']}}"
									@endif
									{{--Add id, general class and relational class for days--}}
									@if ($row > 1 && $column > 0)
										@php
											$combined_id = $data[$table][$row][0]["id"] . "-" . $data[$table][$row][$column]["id"];
											$relation_id = array_search($combined_id, $related);
											$classname; $payload;
											if (!$relation_id)
											{
												$classname = "";
												$payload = "";
											}
											else if ($related_data[$relation_id]["type"] == "offday")
											{
												$classname = "offday";
												$payload = "";
											}
											else if ($related_data[$relation_id]["type"] == "halfday")
											{
												$classname = "halfday";
												$payload = "";
											}
											else
											{
												$classname = "";
												$payload = $related_data[$relation_id]["text"];
											}
										@endphp
										class="day {{$classname}}"
										id="d{{$combined_id}}"
									@endif
								>
									{{--Enter usernames into first column--}}
									@if ($column == 0)
										{{ $data[$table][$row][$column]["name"] }}
									@endif
									{{--Enter day numbers into first row--}}
									@if ($row == 0 && $column != 0)
										{{ $data[$table][$row][$column]["day_in_month_number"] }}
									@endif
									{{--Enter weekday names into second row--}}
									@if ($row == 1 && $column != 0)
										{{ $data[$table][$row][$column]["day_name"] }}
									@endif
									{{--Enter payload into days if day and user are related--}}
									@if ($row > 1 && $column > 0)
										{{ $payload }}
									@endif
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
	.offday {
		background-color: grey;
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