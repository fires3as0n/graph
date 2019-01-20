<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link rel="apple-touch-icon" sizes="128x128" href="/img/icon.jpg">

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="/fontawesome/css/all.css"/>
	@yield('CSS')

	@yield('head_JS')
	<title>Graphic app </title>
</head>

<body>
<h1>Graphic app</h1>

<ul class="nav">
<li class="nav-item">
	<a class="nav-link" href="/">Graphic</a>
</li>
<li class="nav-item">
	<a class="nav-link" href="/generate">Generate DB seed</a>
</li>
</ul>


@yield('content')

@yield('foot_JS')
</body>
</html>