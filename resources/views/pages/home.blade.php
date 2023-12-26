@extends('app')  

@section('content')
<x-main.header/>
<x-main.menu/>
 
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-3 sticky-top" style="height: 100vh;">
            <x-main.cita-card/>
            <div style="height: 65%; border: 1px solid #ddd; padding: 1rem; overflow-y: auto;"> 
                @for ($i = 1; $i <= 5; $i++)
                <div style="border: 1px solid #ddd; margin-top: 1rem; height: 100px;"></div>
                @endfor
                
            </div>
        </div>

        <div class="col-lg-6" style="height: 100vh; overflow-y: auto;">
            <!-- Contenido de la segunda columna con scroll -->
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <!-- Slides del slider aquí -->
            </div>
            <!-- Divs separados -->
            @for ($i = 1; $i <= 5; $i++)
            <div style="border: 1px solid #ddd; margin-top: 1rem; height: 100px;"></div>
            @endfor
        </div>

        <div class="col-lg-3 sticky-top" style="height: 100vh;">
            <div style="height: 20%; border: 1px solid #ddd; padding: 1rem;">
                <!-- Primer div con ul -->
                <ul>
               
                @foreach ($poems as $poem) 
 
                    <li><a href="{{route('poems',  ['id' =>$poem->id])}}">
                        {{ $poem->title }}</a></li>
                @endforeach

                </ul>
            </div>
            <div style="height: 20%; border: 1px solid #ddd; padding: 1rem;">
                <!-- Segundo div con ul -->
                <ul>
                    @for ($i = 6; $i <= 10; $i++)
                    <li>Elemento {{ $i }}</li>
                    @endfor
                </ul>
            </div>
            <div style="height: 60%; border: 1px solid #ddd; padding: 1rem;">
                <!-- Tercer div con 60% del espacio -->
            </div>
        </div>
    </div>
</div>
@endsection
