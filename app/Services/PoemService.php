<?php
 
namespace App\Services;

use App\Models\Poem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator; 

class PoemService {

    private $targetDirectory = "public/poems/"; 

    public function showPoems($page)
    {  
        return Poem::select('poems.*', 'users.name', 'users.id as user_id', 'users.profile_photo_path as user_pic')
        ->leftJoin('users', 'users.id', '=', 'poems.user_id')
        ->where('poems.is_public', 1)
        ->with('tags')
        ->paginate(6, $page); 
        
    }
  
    public function poem($id)
    {    
            return Poem::where('poems.id', $id)
            ->select(
            'poems.title',
            'poems.author',
            'poems.image',
            'poems.id',
            'poems.content',
            'users.name',
            'users.id as user_id',
            DB::raw('CASE WHEN users.email_verified_at IS NOT NULL THEN TRUE ELSE FALSE END AS verificated'),
            DB::raw('(SELECT COUNT(*) FROM poems p WHERE p.user_id = users.id) AS poems_count'),
            DB::raw('(SELECT GROUP_CONCAT(p.id) FROM (SELECT ' . $id . ' as id UNION SELECT id FROM poems WHERE user_id = users.id AND id != ' . $id . ') p) AS poems_ids')
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
            ->leftJoin('users', 'poems.user_id', '=', 'users.id')
            ->first();
      
    }

    public function count($user_id)
    {
       return Poem::where('user_id', $user_id)->pluck('id');
    }

    public function showPoemsByTag($tag)
    {
        if(is_array($tag))
        {
           return Poem::leftJoin('poem_tags', 'poems.id', '=', 'poem_tags.poem_id')
            ->whereIn('poem_tags.tag_id', $tag)
            ->groupBy('poems.id')
            ->havingRaw('COUNT(DISTINCT poem_tags.tag_id) <= 2')
            ->select('poems.*')
            ->where('poems.is_public', 1)
            ->with('tags')
            ->get();

        }else
        {
            return Poem::leftJoin('poem_tags', 'poems.id', '=', 'poem_tags.poem_id') 
            ->groupBy('poems.id') 
            ->select('poems.*')
            ->where('poems.is_public', 1)
            ->where('poem_tags.tag_id', $tag)
            ->with('tags')
            ->get();
        }
    }

    public function savePoem($data)
    {
        
        $validate = Validator::make([
            'title' => $data->title, 'content' => $data->content
        ], Poem::rules());

        if($validate->fails()){
            
            return  $validate->errors()->messages();
        }

        $new = new Poem();
        $new->title  = $data->title;
        $new->content  = $data->content;
        $new->is_public = $data->isPublic;
        $new->author = $data->author ? $data->author : $data->user()->name;
        $img = $data->image; 
 
        if($img != null){
           
            try {

                 $new->image =  $this->uploadImage($img);
                 $result =  $data->user()->poems()->save($new);
                 if($data->tagIds && count($data->tagIds) > 0) { 
                    app(MainService::class)->poemTags($result->id, $data->tagIds); }

                    return $result;
            
                } catch (\Throwable $th) {
                 
            }
        }else{
            $result =  $data->user()->poems()->save($new);
            if($data->tagIds && count($data->tagIds) > 0) { 
                app(MainService::class)->poemTags($result->id, $data->tagIds); }
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
