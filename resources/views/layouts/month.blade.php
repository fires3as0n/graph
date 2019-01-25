@php
	$months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
@endphp

	<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link rel="apple-touch-icon" sizes="128x128" href="/img/icon.jpg">

	{{--Bootstrap--}}
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"></script>

	<link rel="stylesheet" href="/fontawesome/css/all.css"/>
	<link rel="stylesheet" href="/css/layouts/month.css">


	@yield('CSS')

	@yield('head_JS')
	<title>График</title>
</head>

<body>

<div class="menu">

	<div class="dropdown">
		<button class="btn btn-primary btn-lg dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			{{ $month_name }}
		</button>

		<div class="dropdown-menu">
			@for($i=0;$i<12;$i++)
				<a class="dropdown-item" href="/{{$year}}/{{$i+1}}">{{$months[$i]}}</a>
			@endfor
		</div>
	</div>

	<div class="dropdown">
		<button class="btn btn-primary btn-lg dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			{{ $year }}
		</button>

		<div class="dropdown-menu">
			@for($i=2019;$i<2026;$i++)
				<a class="dropdown-item" href="/{{$i}}/{{$month_number}}">{{$i}}</a>
			@endfor
		</div>
	</div>

</div>

@yield('content')

<a class="generate" href="/generate">Generate DB seed</a>

<div class="personal container">

	<div>
		<a href="/settings" class="btn btn-link">Настройки</a>
	</div>


	<div>
		<input value="Выход" type="submit" class="btn btn-link" form="logout" />
		<form id="logout" method="post" action="/logout">
			{{ csrf_field() }}
		</form>
	</div>

</div>
@yield('foot_JS')
</body>
</html>