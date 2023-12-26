<?php
 
namespace App\Services;

use App\Models\Poem;
use App\Models\Comment;
use App\Services\MainService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CommentService {

    public function saveComment($data, $content, $userId, $classType)
    {
        
        
    
        $validator = Validator::make([
            'content' => $content,
            'user_id' => $userId
        ], Comment::rules());
    
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->messages());
            
        }
        switch ($classType) {
            case 'App\Models\Poem':
                $item = Poem::findOrFail($data);

            //    return $data;
           
                break;
            
            default:
                return 'ay no';
                break;
        }
        $comment = new Comment();
        $comment->content = $content;
        $comment->user_id = $userId;
    
        try {
             $item->comments()->save($comment); 
             $response = app(MainService::class)->getDataByItem($data, $classType); 
             return $response;
        } catch (\Throwable $th) {
            return ['error' => $th];
        }
         
       
    
    }

    public function updateComment($commentId, $content)
    {
        $userId = Auth::id();
    
        $validator = Validator::make([
            'content' => $content,
            'user_id' => $userId
        ], Comment::rules());
    
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->messages());
        }
        $comment = Comment::findOrFail($commentId);
        $comment->content = $content;
        $comment->save();
        return true; 
    }

    public function deleteComment($data)
    { 
       
       
        try {
     
            $comment = comment::findOrFail($data); 
            
            $comment->delete();
 
            return 'ok';
          
        } catch (ModelNotFoundException $exception) { 

            return 'Comment not found.';
 
        }
    }
 
}