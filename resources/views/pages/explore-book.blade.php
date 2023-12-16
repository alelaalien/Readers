@extends('layouts.app') 
 
@section('content')  
<x-main.header/>
<x-main.menu/>
    @if(isset($book))  
    <div class="container" style="box-shadow: -1px 15px 30px -12px black;"> 
        <div class="row">
            <div class="col-lg-12">
                <div class="p-20 align-items-center text-center">
                    <h2 class="book-title-h2"> 
                        <span class="font-weight-bold">{{__('Title')}}:</span>
                        {{$book->title}}
                    </h2> 
                </div> 
            </div>
        </div>
        @php 
            $reviewed = false;
            if ($book->reviews->isNotEmpty()) {
                $reviewed = $book->reviews->contains('is_public', 1);
            }
            
        @endphp
        <!-- libros con review -->
        @if ($reviewed)  
            <div class="row">  
                <x-carrousel :book="$book" :width="7"/> 
                <div class="col-lg-5">
                    <x-book-info-card :book="$book"/>   
                </div> 
            </div>
            <img src="{{asset('img/separador_.png')}}" alt="" style="opacity: 0.3;">
            <div class="row "> 
                <div class="col-lg-4 col-sm-12">
                    <div class="d-block d-lg-none">
                        <x-mini-user-card :user="$book->user"/>   
                    </div>
                    <div class="d-none d-lg-block">
                        <x-user-card :user="$book->user"/>   
                    </div> 
                </div>
                <div class="col-lg-8 col-md-12">
                    <div class="pt-20 text-center">
                        <span class="bold pt-20">{{__('Reflections on the Book: My Personal Perspective')}}</span>
                        <p class="text-justify pt-20">{{$book->reviews[0]->review}}</p>
                    </div>  
                </div>  
            </div>

            <img src="{{asset('img/separador_.png')}}" alt="" style="opacity: 0.3;"> 
            @else 
            <!--************************ libros sin review ***************************************-->
            <div class="row">  
                <x-carrousel :book="$book" :width="8"/> 
                <div class="col-lg-4"> 
                    <div class="d-none d-lg-block">
                        <x-user-card :user="$book->user"/>   
                    </div>
                </div> 
            </div>
            <div class="row">
                <img src="{{asset('img/separador_.png')}}" alt="" style="opacity: 0.3;">
                    <x-book-info-card :book="$book"/>   
                <img src="{{asset('img/separador_.png')}}" alt="" style="opacity: 0.3;">
            </div>
            <div class="row">
                <div class="d-block d-lg-none">
                    <x-mini-user-card :user="$book->user"/>   
                </div>
            </div> 
            @endif
    </div>
    <div class="container-fluid">
        <div class="row">
            @livewire('books-by-genres', ['genreIds' => $bookGenre]);
        </div> 
    </div>
    @endif
@endsection