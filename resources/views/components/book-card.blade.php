<div class="col-lg-3 col-sm-4 tmargin-1">
        <div class="card">
            <h4 class="card-title book-title">{{$data->title}}</h4>
        @if($data->cover)
        <div  class="o-hidden">
            <img class="img-card book-card-img"  src="{{asset('img/books/'. $data->cover)}}" alt="Card image">
        </div> 
        @endif
        <div class="card-body"> 
            <p class="card-text txt-end text-muted">{{ __('By ')}} {{$data->author}}</p>
            <a href="{{ route('explore-book', ['id' => $data->id]) }}#book" target="_blank" class="btn btn-secondary pull-right right-20">{{__('Explore')}}</a>
        </div>
    </div> 
</div>