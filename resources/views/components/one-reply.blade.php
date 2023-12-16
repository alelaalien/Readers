<div class="row" style="margin-bottom: 0.23rem;">

    <div class="col-lg-1 col-md-1"> 
        <div class="user-thumbnail thumbnail d-flex cursor-pointer"> 
            <a href="{{route('profiles', ['id' => $reply->id])}}" class="link-style-none  m-a">
                <img src="{{asset('img/users/' . $reply->user_pic)}}" class="user-image" alt="User thumbnail" style="width:50px!important;">
            </a> 
        </div>
    </div>
    <div class="col-lg-11 col-md-11">
        <div class="w-100 justify-content-between comment-card" style="background: #ece3cd;"> 
            <div class="d-flex ">
                <h5 class="mb-1 comment-user-name">{{$reply->name}}</h5>    
                    @if(auth()->check()) 
                        @php($keyOption = rand(111111, 999999))
                        @livewire('reply-points',[ 'data' => $comment->id. '-'.$reply->id], key('points-'.$keyOption)) 
                     
                        @livewire('reply-editor', ['reply' => $reply, 'comment' => $comment,  'data' => $comment->id. '-'.$reply->id], key('editor-'.$keyOption))
                    @endif 
            </div>
            @php($keyOption = rand(111111, 999999))
            @livewire('reply-card', ["content" => $reply->content, 'reply' =>$reply, 'data' => 'card-' .$comment->id. '-'.$reply->id], key('card-'.$keyOption))
            <small class="text-muted">{{$reply->f_created_at}}</small> 
        </div> 
    </div>  
    <div> 
    </div>
</div>