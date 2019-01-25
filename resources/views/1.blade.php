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