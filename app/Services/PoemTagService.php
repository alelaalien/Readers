<?php

namespace App\Services;
use App\Models\PoemTag;

class PoemTagService{

    public function savePoemTag($poem, $tags)
    {  
        foreach ($tags as $key => $value) {
            
            $poemTag = new PoemTag(); 
            $poemTag->poem_id = $poem;   
            $poemTag->tag_id = $value; 
            $poemTag->save();
        } 
    } 

}