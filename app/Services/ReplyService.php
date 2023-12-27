<?php
 
namespace App\Services;

use App\Models\Comment;
use App\Models\Reply;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ReplyService {

    public function saveReply($data, $content)
    {
        $userId = Auth::id(); 

        $validator = Validator::make([
            'content' => $content,
            'user_id' => $userId
        ], Reply::rules());
    
        if ($validator->fails()) {
            
            return;
        }
    
        $reply = new Reply();
        $reply->content = $content;
        $reply->user_id = $userId;
        $comment = Comment::find($data);
        if($comment){
            
            $comment->replies()->save($reply);
        }    
        return  $this->getRepliesByCommentId($data);;
    }

    public function getRepliesByCommentId($id)
    {
        return Reply::select('id', 'user_id', 'content', 'comment_id', 'created_at', 'updated_at')
        ->with([
            'user:id,name,email_verified_at,profile_photo_path as user_pic',
        ])
        ->where('comment_id', $id)
        ->orderByDesc('created_at')
        ->get();
 
    }

    public function updateReply($replyId, $content)
    {   
        $userId = Auth::id(); 
        $validator = Validator::make([
            'content' => $content,
            'user_id' => $userId
        ], Reply::rules());
    
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->messages());
        }

        $reply = Reply::findOrFail($replyId); 
        $reply->content = $content;
        $reply->save(); 
        return $reply;
    }

    public function deleteReplyById($replyId)
    { 
        try {
     
            $reply = Reply::findOrFail($replyId);
            
            $reply->delete();
            
            return 'ok';
          
        } catch (ModelNotFoundException $exception) { 

            throw new \Exception('Reply not found.');

            
        }

        
    }
}