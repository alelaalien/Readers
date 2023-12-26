<div class="row p-1">
    <div class="col-sm-12 d-flex  bg-maxlight p-1" >
        <h3 class="section-title  txt--dark05 text-uppercase">{{__('RECENT REVIEWS')}}</h3>
        <div class="p-a r-0 p-1">
            <button class="btn btn-see bg-darkmode txt--maxlight">{{__('SEE MORE')}} </button>
        </div>
    </div> 
    <div class="col-sm-12 container"> 
        <div class="container">
            <div class="row">
            @if($data)
                @foreach($data as $item) 
                    <div class="col-sm-4 tmargin-1">
                        <div class="card">
                            <h4 class="card-title book-title">{{$item->book_name}}</h4>
                        <div class="card-body paddin25">
                        <p class="card-text txt-end text-muted">{{__('Requested by ')}}<a href="">{{$item->name}}</a></p>
                            <p class="card-text txt-justify">{{$item->comment}}</p>

                            <a href="#" class="btn btn-secondary pull-right">Reed it</a>
                        </div>
                    </div> 
                </div>
                @endforeach
             @else
                <div class="col-sm-12">
                    <h3 class="text-muted"> {{__('NO DATA YET')}}</h3>
                </div>
            @endif 
            </div>
        </div>
    </div>
</div>  