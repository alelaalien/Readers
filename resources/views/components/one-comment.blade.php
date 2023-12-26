<div class="row  m-b-1">
    <div class="col-lg-1 col-md-1"> 
        <div class="user-thumbnail thumbnail d-flex cursor-pointer"> 
            <a href="{{route('profiles', ['id' => $comment->user->id])}}" class="link-style-none  m-a">
                <img src="{{asset('img/users/' . $comment->user->user_pic)}}" class="user-image" alt="User thumbnail" style="width:50px!important;">
            </a> 
        </div>
    </div>
    <div class="col-lg-11 col-md-11">
        <div class="w-100 justify-content-between comment-card"> 
            <div class="d-flex  justify-content-between">
                <h5 class="mb-1 comment-user-name">{{$comment->user->name}}</h5>   
                <div id="">
                    @if(auth()->check())
                   
                    @php($keyOption = rand(111111,999999))
                    
                        @livewire('comment-points',[ 'data' => $comment->id], key('points-'.$keyOption)) 
                        @livewire('comment-editor', ['comment' => $comment, 'data' => $comment->id], key('editor-'.$keyOption))   
                       
                    @endif
                </div>
            </div>
            @php($keyOption = rand(111111, 999999))
            @livewire('comment-card', ['content' => $comment->content,'comment' =>$comment , 'data' =>'card--' .$comment->id], key('card--'.$keyOption))
          
            <div class="d-flex  justify-content-between "> 
                <small class="text-muted">{{$comment->f_created_at}}</small>  
                @if(auth()->check())
                <div class="d-flex">
                    <span class="reply-comment-button cursor-pointer collapser collapser{{$comment->id}}" data-id="{{$comment->id}}" data-toggle="collapse" data-target="#comment-tails-{{$comment->id}}" aria-expanded="false" aria-controls="comment-tails-{{$comment->id}}">{{__('Reply')}}</span>
                        @if($comment->replies_count)
                        <samll class="text-muted" style="font-size: 12px;;">({{$comment->replies_count}})</samll>
                        @endif
                </div> 
                @else
                    @if($comment->replies_count)
                    <div>
                        <span class="text-muted cursor-pointer collapser{{$comment->id}}" style="font-size: 12px; "  data-id="{{$comment->id}}" data-toggle="collapse" data-target="#comment-tails-{{$comment->id}}" aria-expanded="false" aria-controls="comment-tails-{{$comment->id}}">{{__('View replies ')}} ({{$comment->replies_count}})</span>

                    </div>
                    @endif
                @endif
            </div>
        </div>   
        <!-- replies -->
        <div class="collapse collapse-div" id="comment-tails-{{$comment->id}}" style="margin-top:10px;"> 
            <!--form  -->
            @php($key = rand(11111,99999))
            @livewire('reply-form', ['action' => 'sendReply', 'modelGroup' => $comment, 'modelContent' => 'content'], key($key))
            @php($key2 = rand(11111,99999)) 
            @livewire('reply-list', ['comment'=> $comment], key($key2) ) 
        </div>

    </div> 
</div>