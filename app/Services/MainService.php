<?php

namespace App\Services;

use App\Models\Poem;
use App\Models\Thought;
use App\Models\ThoughtTags;
use Illuminate\Support\Facades\DB;
use App\Services\ThoughtTagService;

class MainService{

    public function getDataByItem($itemId, $classType){
 
        switch ($classType) {
            case 'App\Models\Poem': 
                $response = app(PoemService::class)->poem($itemId);
                return $response; 
           
                break;
                case 'App\Models\Thought': 
                    $response = app(ThoughtService::class)->thought($itemId);
                    return $response; 
               
                    break;
            
            default:
                return 'ay no';
                break;
        }
    }

    public function poemTags($poem, $dataTag)
    {
        app(PoemTagService::class)->saveThoughtTag($poem, $dataTag);
    }
    public function thoughtTags($thought, $dataTag)
    {
        app(ThoughtTagService::class)->saveThoughtTag($thought, $dataTag);
    }

    public function loadIndex()
    {   
            $page = 1;

            $poems = Poem::select('poems.title', 'poems.content', 'poems.image', 'poems.created_at', 'poems.id',
                                 'users.name', 'users.id as user_id', 'users.profile_photo_path as user_pic')
                    ->addSelect(DB::raw('"poem" as class'))
                    ->leftJoin('users', 'users.id', '=', 'poems.user_id')                
                    ->where('poems.is_public', 1)
                    ->with('tags')
                    ->orderBy('poems.created_at', 'desc');

            $thoughts = Thought::select('thoughts.title', 'thoughts.content','thoughts.image', 'thoughts.created_at', 'thoughts.id',
                                'users.name', 'users.id as user_id', 'users.profile_photo_path as user_pic')
                ->addSelect(DB::raw('"thought" as class'))
                ->leftJoin('users', 'users.id', '=', 'thoughts.user_id')
                ->where('thoughts.is_public', 1)
                ->with('tags')
                ->orderBy('thoughts.created_at', 'desc');

            $results = $poems->union($thoughts)->orderByDesc('created_at')->paginate(10, $page);

            $data = $results->items();
              
        return response()->json($data);
    }
}