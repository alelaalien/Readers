<?php

namespace App\Services;

use App\Models\Tag; 

class TagService{

    public function tagsAndPoems()
    {
        return  Tag::select('tags.id as tag_id', 'tags.tag' ) 
        ->distinct()
        ->join('poem_tags', 'tags.id', '=', 'poem_tags.tag_id')
        ->orderBy('tags.tag', 'asc')
        ->get(); 
    }

    public function tagsAndThoughts()
    {
        return  Tag::select('tags.id as tag_id', 'tags.tag' ) 
        ->distinct()
        ->join('thought_tags', 'tags.id', '=', 'thought_tags.tag_id')
        ->orderBy('tags.tag', 'asc')
        ->get(); 
    }

    public function tags()
    {
        return Tag::orderBy('tag', 'asc')->get();
    }
}