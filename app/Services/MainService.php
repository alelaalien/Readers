<?php

namespace App\Services;

use App\Models\Poem;

class MainService{

    public function getDataByItem($itemId, $classType){

       
        switch ($classType) {
            case 'App\Models\Poem': 
                $response = app(PoemService::class)->poem($itemId);
                return $response; 
           
                break;
            
            default:
                return 'ay no';
                break;
        }
    }

    public function poemTags($poem, $dataTag)
    {
        app(PoemTagService::class)->savePoemTag($poem, $dataTag);
    }
}