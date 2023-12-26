@extends('layouts.app') 
 
@section('content')  
    <x-main.header/>
    <x-main.menu/>
    <div class="row">
        @foreach($books as $book)
        <x-book-card :data="$book"/>
        @endforeach 
    </div> 
@endsection