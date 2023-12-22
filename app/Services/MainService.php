<?php

namespace App\Services;

use App\Models\Poem;

class MainService{

    public function getDataByItem($itemId, $classType){

       
        switch ($classType) {
            case 'App\Models\Poem': 
                $response = app(PoemService::class)->showPoems($itemId);
                return $response;

            //    return $data;
           
                break;
            
            default:
                return 'ay no';
                break;
        }
    }
}