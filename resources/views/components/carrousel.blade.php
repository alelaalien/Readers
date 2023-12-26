<div class="col-lg-{{$width}}">
@php
    $gallery = json_decode($book->gallery);

    if ($book->cover !== null) {
        $gallery[] = $book->cover;
    }

    if (!empty($gallery)) {
@endphp

    <div id="carousel-book" class="carousel slide" data-ride="carousel">
        <!--  -->
        <div class="carousel-inner" style="height: 400px;">
            @foreach ($gallery as $index => $img)
                <div class="carousel-item {{ $index === 0 ? 'active' : '' }}" style="height: 100%;">
                    <img class="d-block mx-auto" src="{{ asset('img/books/'. $img) }}" alt="Slide {{ $index }}" style="max-height: 100%; width: auto;">
                </div>
            @endforeach
        </div>
        <!-- minis -->
        <div class="row mt-2">
            @foreach ($gallery as $index => $img)
                <div class="col-2">
                    <img class="d-block w-100" src="{{ asset('img/books/'. $img) }}" alt="Miniatura {{ $index }}" data-target="#carousel-book" data-slide-to="{{ $index }}">
                </div>
            @endforeach
        </div> 
        <!-- navegacion-->
        <a class=" carousel-control carousel-control-prev h-200 mt-auto mb-auto rounded rounded-top rounded-bottom " href="#carousel-book" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">{{__('Previous')}}</span>
        </a>
        <a class=" carousel-control carousel-control-next h-200 mt-auto mb-auto rounded rounded-top rounded-bottom" href="#carousel-book" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">{{__('Next')}}</span>
        </a> 
    </div>

@php
    } else {
    
        echo '<p>Sin imágenes</p>';
    }
@endphp

</div> 