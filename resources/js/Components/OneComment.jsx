import { useState } from "react";
import CommentCard from "./CommentCard";

export default function OneComment({comment})
{
    console.log(comment );
    return (
        <div className="row  m-b-1">
            <div className="col-lg-1 col-md-1"> 
                <div className="user-thumbnail thumbnail d-flex cursor-pointer"> 
                    <a href="/profiles" className="link-style-none  m-a">
                        <img src="img/users/" className="user-image" alt="User thumbnail" style={{width:'50px'}}/>
                    </a> 
                </div>
            </div>
            <div className="col-lg-11 col-md-11">
                <div className="w-100 justify-content-between comment-card"> 
                    <div className="d-flex  justify-content-between">
                        <h5 className="mb-1 comment-user-name">
                            {comment.user.name }
                            </h5>   
                        <div id="editor-">
                            {/* @if(auth().check())
                        
                            @php($keyOption = rand(111111,999999))
                            
                                @livewire('comment-points',[ 'data' => $comment.id], key('points-'.$keyOption)) 
                                @livewire('comment-editor', ['comment' => $comment, 'data' => $comment.id], key('editor-'.$keyOption))   
                            
                            @endif */}
                            {/* comment-card */}
                            <CommentCard comment={comment}></CommentCard>
                        </div>
                    </div>
                    {/* @php($keyOption = rand(111111, 999999))
                    @livewire('comment-card', ['content' => $comment.content,'comment' =>$comment , 'data' =>'card--' .$comment.id], key('card--'.$keyOption))
                 */}
                    <div className="d-flex  justify-content-between "> 
                        <small className="text-muted">
                            {/* {{$comment.f_created_at}} */}
                            </small>  
                        {/* @if(auth().check()) */}
                        <div className="d-flex">
                            <span className="reply-comment-button cursor-pointer collapser collapser " data-id=" " data-toggle="collapse" data-target="#comment-tails-{{$comment.id}}" aria-expanded="false" aria-controls="comment-tails-comment-id"></span>
                                {/* @if($comment.replies_count) */}
                                <samll className="text-muted" style= {{fontSize: '12px'}} >
                                    {/* ({{$comment.replies_count}}) */}
                                    </samll>
                                {/* @endif */}
                        </div> 
                        {/* @else
                            @if($comment.replies_count) */}
                            <div>
                                <span className="text-muted cursor-pointer collapsercomment-id" style={{fontSize: '12px'}}  data-id="comment-id" data-toggle="collapse" data-target="#comment-tails-comment.id" aria-expanded="false" aria-controls="comment-tails-comment-id"></span>

                            </div>
                            {/* @endif
                        @endif */}
                    </div>
                </div>   
                {/* <!-- replies -. */}
                <div className="collapse collapse-div" id="comment-tails-comment-id" style= {{marginTop:'10px'}} > 
                    {/* <!--form  -.
                    @php($key = rand(11111,99999))
                    @livewire('reply-form', ['action' => 'sendReply', 'modelGroup' => $comment, 'modelContent' => 'content'], key($key))
                    @php($key2 = rand(11111,99999)) 
                    @livewire('reply-list', ['comment'=> $comment], key($key2) )  */}
                </div>

            </div> 
        </div>
    )
}