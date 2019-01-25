@extends('layouts.auth')

@section('CSS')
	<link href="css/settings.css" rel="stylesheet">
@endsection


@section('content')

<div class="container">
	<div class="row">

		<div class="col-12 col-md-6">

@if (session('info'))
	<div class="row">
		<div class="col-md-12">
			<div class="alert alert-success alert-dismissible">
				<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
				{{ session('info') }}
			</div>
		</div>
	</div>
@elseif (session('error'))
	<div class="row">
		<div class="col-md-12">
			<div class="alert alert-danger alert-dismissible">
				<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
				{{ session('error') }}
			</div>
		</div>
	</div>
@endif

			<form class="form-settings" method="POST" action="settings/change-pass">

				<fieldset>
				<legend>Сменить пароль</legend>

					<div class="form-group">
						<label for="new-pass">Новый пароль</label>
						<input type="password" class="form-control" name="new-pass">
					</div>
					<div class="form-group">
						<label for="new-pass-again">Новый пароль еще раз</label>
						<input type="password" class="form-control" name="new-pass-again">
					</div>
					<div class="form-group">
						<label for="old-pass">Старый пароль</label>
						<input type="password" class="form-control" name="old-pass">
					</div>
					@csrf

				</fieldset>

				<button type="submit" class="btn btn-primary">Сменить пароль</button>
			</form>
		</div>

		<div class="col-12 col-md-6">
			<form class="form-settings" method="POST" action="settings/change-email">

				<fieldset>
				<legend>Сменить E-Mail</legend>

					<div class="form-group">
						<label for="new-email">Новый E-Mail</label>
						<input type="email" class="form-control" name="new-email">
					</div>
					<div class="form-group">
						<label for="old-pass">Пароль</label>
						<input type="password" class="form-control" name="old-pass">
					</div>
					@csrf

				</fieldset>

				<button type="submit" class="btn btn-primary">Сменить E-Mail</button>
				</form>
		</div>

	</div>
</div>

@endsection