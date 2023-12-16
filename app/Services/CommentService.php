<?php
 
namespace App\Services;

use App\Models\Comment; 
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CommentService {

    public function saveComment($data, $content)
    {
        
        $userId = Auth::id();
    
        $validator = Validator::make([
            'content' => $content,
            'user_id' => $userId
        ], Comment::rules());
    
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->messages());
        }
    
        $comment = new Comment();
        $comment->content = $content;
        $comment->user_id = $userId;
    
        $data->comments()->save($comment);
        $data->class = get_class($data);
        return $data;
    }

    public function updateComment($comment, $content)
    {
        $userId = Auth::id();
    
        $validator = Validator::make([
            'content' => $content,
            'user_id' => $userId
        ], Comment::rules());
    
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->messages());
        }
        $comment->content = $content;
        $comment->save();
        return true; 
    }

    public function deleteComment($data)
    { 
       
        $retrono =  ["id" => $data->commentable_id,
                    'class' => $data-> commentable_type];
  
        try {
     
            $comment = comment::findOrFail($data->id);
            
            $comment->delete();

            return ['data' =>  $retrono];
          
        } catch (ModelNotFoundException $exception) { 

            throw new \Exception('Comment not found.');
        }
    }
 
}