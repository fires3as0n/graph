{{--{{ dd(get_defined_vars()['__data']) }}--}}
@extends('layouts.app')



@section('content')
  <div class="container">
    <div class="row">
    @for ($i=0; $i<6; $i++)
      <div class="col-12 col-sm-6 no-gutters">
        @yield('table')
      </div>
    @endfor
    </div>
  </div>
@endsection

@section('CSS')
  <style type="text/css">
    /*.col-12.col-sm-6 {*/
      /*border: 1px solid black;*/
      /*padding: 0 5px;*/
    /*}*/
    /*@media  {*/
    /*}*/

  </style>
  @yield('CSS_1')
@endsection

@section('JS')
  @yield('JS_1')
@endsection

