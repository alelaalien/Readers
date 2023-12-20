<?php
 
namespace App\Services;

use App\Models\Comment;
use App\Models\Reply;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        return $reply;  
    }

    public function getRepliesByCommentId($id)
    {
        return DB::table('replies as r')
        ->select('r.id', 'r.content', 'r.comment_id', 'u.name', 'u.profile_photo_path AS user_pic', 
        'r.user_id', DB::raw("DATE_FORMAT(r.created_at, '%d-%m-%Y %H:%s') AS f_created_at"))
        ->leftJoin('users as u', 'u.id', '=', 'r.user_id')
        ->where('r.comment_id', $id)
        ->orderByDesc('r.created_at')
        ->get();  
    }

    public function updateReply($reply, $content)
    {   
        $userId = Auth::id(); 
        $validator = Validator::make([
            'content' => $content,
            'user_id' => $userId
        ], Reply::rules());
    
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->messages());
        }

        $reply = Reply::findOrFail($reply->id); 
        $reply->content = $content;
        $reply->save(); 
        return $reply;
    }

    public function deleteReplyById($replyId)
    { 
        try {
     
            $reply = Reply::findOrFail($replyId);
            
            $reply->delete();
          
        } catch (ModelNotFoundException $exception) { 

            throw new \Exception('Reply not found.');
        }
    }
}