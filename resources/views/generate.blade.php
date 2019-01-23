@extends('layout')

@php
  $month_name = "";
  $year = "";
  $month_number = "";
@endphp

@section('content')
<h4>This page generates database seed file for selected year</h4>

<form action="/generate" method="post" id="form">
  {{ csrf_field() }}
    <input id="data-field" type="hidden" name="data">
</form>
<div class="form-group">
    <label for="year">Enter year</label>
    <input type="number" class="form-control" id="year" name="year" placeholder="1970">
</div>
<button id="button" type="submit" class="btn btn-primary">Submit</button>
<button id="test" class="btn">Test</button>
@endsection


@section('foot_JS')
  <script src="/js/generate.js"></script>

  <script>
  /* testing AJAX XLMHttpRequest
    various resources call variable differently:
    MDN: xhr, oReq
    SOF: http, xmlhttp
    LJSEB: req
  */
    console.clear();
    const ajax = new XMLHttpRequest();

//    ajax.onload = e => {
//      console.log("\n==== ajax.onload = function() {} ====");
//      console.log("this: ", this);
//      console.log("e: ", e);
//      console.log("========");
//    };
    ajax.onload = handleResponse;

    function handleResponse(e) {
      console.log("\n==== ajax.onload = handleResponse; ====");
      console.log("ajax->HandleResponseFunction.this: ", this);
      console.log("ajax.statusText: ", ajax.statusText);
      console.log("ajax.status: ", ajax.status );
      console.log("ajax.responseType: ", ajax.responseType );
      console.log("========");
    }
    //true=default - process async, false-process sync
    ajax.open("GET", "http://127.0.0.1:3000/img/4.jpg", false);
    ajax.send();

    console.log("ajax object itself: ", ajax);
    //console.log("ajax.response: ", ajax.response );
    //console.log("ajax.responseText: ", ajax.responseText );




    const test = document.querySelector('#test');
    test.addEventListener('click', e => {
      console.log("\n===Testing Event handler function on button click===\n");
      console.log("this: ", this);
      console.log("this.innerHTML: ", this.innerHTML);
      console.log("e: ", e);
      console.log("e.innerHTML: ", e.innerHTML);
      console.log("e.srcElement: ", e.srcElement);
      console.log("e.srcElement.innerHTML: ", e.srcElement.innerHTML);

      console.log("test.innerHTML: ", test.innerHTML);
    });

    test.addEventListener('mouseover', notInline);
    function notInline(e)
    {
      console.log("notInline.this: ", this);
    }

/*  handling responses
    ajax.addEventListener("load", handler);
    OR
    ajax.onload = function(e) {}*/


  </script>
@endsection