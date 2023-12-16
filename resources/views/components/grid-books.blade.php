<div class="row p-1">
    <div class="col-sm-12 d-flex  bg-maxlight p-1" >
        <h3 class="section-title  txt--dark05">{{__('NEW PUBLICATIONS')}}</h3>
        <div class="p-a r-0 p-1">
            <button class="btn btn-see bg-darkmode txt--maxlight">{{__('SEE MORE')}} </button>
        </div>
    </div> 
    <div class="col-sm-12 container"> 
        <div class="container">
            <div class="row">
            @if($data)
                @foreach($data as $item) 
                    <x-book-card :data="$item"/>
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