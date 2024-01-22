<?php

namespace App\Services;

use App\Models\Poem;
use App\Models\ThoughtTags;
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
}