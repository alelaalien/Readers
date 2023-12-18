<?php
 
namespace App\Services;

use App\Models\Poem;
use Illuminate\Support\Facades\DB;

class PoemService {

    public function getPoemById($id) {
         
         return   Poem::select(
            'poems.title',
            'poems.author',
            'poems.id',
            'poems.content',
            'users.name',
            'users.id as user_id',
            DB::raw('CASE WHEN users.email_verified_at IS NOT NULL THEN TRUE ELSE FALSE END AS verificated')
        )
        ->leftJoin('users', 'poems.user_id', '=', 'users.id')
        ->where('poems.id', $id)
        ->first();
    }

    public function showPoems($id)
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
                $query->select('id', 'user_id', 'content', 'commentable_id', 'commentable_type')
                    ->selectRaw('DATE_FORMAT(created_at, "%d-%m-%Y %h:%s") as f_created_at')
                    ->orderByDesc('created_at')
                    ->withCount('replies')
                    ->with([
                        'replies' => function ($query) {
                            $query->select('id', 'user_id', 'content', 'comment_id')
                                ->selectRaw('DATE_FORMAT(created_at, "%d-%m-%Y %h:%s") as f_created_at')
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
 
}
