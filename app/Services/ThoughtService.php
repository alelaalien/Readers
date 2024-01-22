<?php
 
namespace App\Services;

use App\Models\Thought;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ThoughtService {
    
    private $targetDirectory = "public/thoughts/";
    
    public function getThoughtByUser($id) {

         return Thought::where('user_id', $id);
    }
      
    public function showThoughts($page)
    {  
        return Thought::select('thoughts.*', 'users.name', 'users.id as user_id', 'users.profile_photo_path as user_pic')
        ->leftJoin('users', 'users.id', '=', 'thoughts.user_id')
        ->where('thoughts.is_public', 1)
        ->with('tags')
        ->paginate(6, $page); 
        
    }
  
    public function thought($id)
    {    
            return Thought::where('thoughts.id', $id)
            ->select(
            'thoughts.title', 
            'thoughts.image',
            'thoughts.id',
            'thoughts.content',
            'users.name',
            'users.id as user_id',
            DB::raw('CASE WHEN users.email_verified_at IS NOT NULL THEN TRUE ELSE FALSE END AS verificated'),
            DB::raw('(SELECT COUNT(*) FROM thoughts p WHERE p.user_id = users.id) AS thoughts_count'),
            DB::raw('(SELECT GROUP_CONCAT(p.id) FROM (SELECT ' . $id . ' as id UNION SELECT id FROM thoughts WHERE user_id = users.id AND id != ' . $id . ') p) AS thoughts_ids')
            )
            ->with([
            'comments' => function ($query) {
                $query->select('id', 'user_id', 'content', 'commentable_id', 'commentable_type', 'created_at')
                    ->orderByDesc('created_at')
                    ->withCount('replies')
                    ->with([
                        'replies' => function ($query) {
                            $query->select('id', 'user_id', 'content', 'comment_id', 'created_at', 'updated_at')
                                ->with('user:id,name,email_verified_at,profile_photo_path as user_pic');
                        },
                        'replies.user:id,name,email_verified_at,profile_photo_path as user_pic',
                        'user:id,name,email_verified_at,profile_photo_path as user_pic'
                    ]);
            }
            ])
            ->leftJoin('users', 'thoughts.user_id', '=', 'users.id')
            ->first();
      
    }

    public function count($user_id)
    {
       return Thought::where('user_id', $user_id)->pluck('id');
    }

    public function showThoughtsByTag($tag)
    {
        if(is_array($tag))
        {
           return Thought::leftJoin('thoughts_tags', 'thoughts.id', '=', 'thoughts_tags.Thought_id')
            ->whereIn('thoughts_tags.tag_id', $tag)
            ->groupBy('thoughts.id')
            ->havingRaw('COUNT(DISTINCT thoughts_tags.tag_id) <= 2')
            ->select('thoughts.*')
            ->where('thoughts.is_public', 1)
            ->with('tags')
            ->get();

        }else
        {
            return Thought::leftJoin('thoughts_tags', 'thoughts.id', '=', 'thoughts_tags.Thought_id') 
            ->groupBy('thoughts.id') 
            ->select('thoughts.*')
            ->where('thoughts.is_public', 1)
            ->where('thoughts_tags.tag_id', $tag)
            ->with('tags')
            ->get();
        }
    }

    public function saveThought($data)
    {
        
        $validate = Validator::make([
            'title' => $data->title, 'content' => $data->content
        ], Thought::rules());

        if($validate->fails()){
            
            return  $validate->errors()->messages();
        }

        $new = new Thought();
        $new->title  = $data->title;
        $new->content  = $data->content;
        $new->is_public = $data->isPublic;
        $img = $data->image; 
 
        if($img != null){
           
            try {

                 $new->image =  $this->uploadImage($img);
                 $result =  $data->user()->thoughts()->save($new);
                 if($data->tagIds && count($data->tagIds) > 0) { 
                    app(MainService::class)->ThoughtTags($result->id, $data->tagIds); }

                    return $result;
            
                } catch (\Throwable $th) {
                 
            }
        }else{
            $result =  $data->user()->thoughts()->save($new);
            if($data->tagIds && count($data->tagIds) > 0) { 
                app(MainService::class)->ThoughtTags($result->id, $data->tagIds); }
                return $result;
        }

    }

    private function uploadImage($img)
    {
        $name = $this->randomString();

        $fileName = $name.'.' . $img->getClientOriginalExtension();
 
        $storageUrl = $img->storeAs($this->targetDirectory, $fileName);
 
        Storage::url($storageUrl); 

        return $fileName;
    }

    private function randomString()
    { 
        $rand = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return substr(str_shuffle($rand), 0, 8); 
    }
 
}
