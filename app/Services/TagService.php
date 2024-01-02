<?php

namespace App\Services;

use App\Models\Tag;
use Illuminate\Support\Facades\DB;

class TagService{

    public function tagsAndPoems()
    {
        return  Tag::select('tags.id as tag_id', 'tags.tag' ) 
        ->distinct()
        ->join('poema_tag', 'tags.id', '=', 'poema_tag.tag_id')
        ->orderBy('tags.tag', 'asc')
        ->get(); 
    }
}