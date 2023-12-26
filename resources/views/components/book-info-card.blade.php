<div class="book-info-card">
    <div class=""> 
        @foreach ([
            'Author' => $book->author,
            'Editorial' => $book->editorial,
            'Pages'      => $book->pages,
            'Dimensions' => $book->width ." x ".$book->height ."cm."] as $label => $value)
            @if ($value)
                <div><span class="font-weight-bold">{{ __($label) }}: </span>{{ $value }}</div>
            @endif
        @endforeach
        <p class="text-align-justify"><span class="font-weight-bold">{{ __('Synopsis') }}: </span>{{$book->synopsis}}</p> 
    </div>
</div>