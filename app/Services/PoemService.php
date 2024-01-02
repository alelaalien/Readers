<?php
 
namespace App\Services;

use App\Models\Poem;
use Illuminate\Support\Facades\DB;

class PoemService {

    public function showPoems()
    { 

        return Poem::select('poems.*', 'users.name', 'users.id as user_id', 'users.profile_photo_path as user_pic')
        ->leftJoin('users', 'users.id', '=', 'poems.user_id')
        ->where('poems.is_public', 1)
        ->with('tags')
        ->get();
        
    }
  
    public function poem($id)
    {    
            return Poem::where('poems.id', $id)
            ->select(
            'poems.title',
            'poems.author',
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
           return Poem::leftJoin('poema_tag', 'poems.id', '=', 'poema_tag.poem_id')
            ->whereIn('poema_tag.tag_id', $tag)
            ->groupBy('poems.id')
            ->havingRaw('COUNT(DISTINCT poema_tag.tag_id) <= 2')
            ->select('poems.*')
            ->where('poems.is_public', 1)
            ->with('tags')
            ->get();

        }else
        {

        }
    }
 
}
