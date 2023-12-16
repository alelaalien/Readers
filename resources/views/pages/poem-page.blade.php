@extends('layouts.app') 
@section('content')
<x-main.header/>
<x-main.menu/> 
@php($count = explode(',', $poem->poems_ids))
@php($key = rand(111111,999999))
@livewire('poems', ['poem' => $poem, 'count' => $count], key($key.'-poem')) 
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
@endsection