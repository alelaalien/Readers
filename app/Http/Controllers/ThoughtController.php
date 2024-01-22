<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Thought;
use App\Services\TagService;
use Illuminate\Http\Request;
use App\Services\ThoughtService;

class ThoughtController extends Controller
{ 
    public function index()
    {    
        $thoughts = app(ThoughtService::class)->showThoughts(1); 

        $tags = app(TagService::class)->tagsAndthoughts();

        return Inertia::render('Echoes/index', ['thoughts' => $thoughts, 'tags' => $tags]); 
    }

    public function scroll(Request $request)
    { 
        $thoughts = app(ThoughtService::class)->showthoughts($request->page); 

        $tags = app(TagService::class)->tagsAndthoughts();

        return response()->json(['thoughts' => $thoughts, 'tags' => $tags]);
    }


    public function thought($id)
    {   
        
        $thought = app(ThoughtService::class)->thought($id); 
        $thought->class= get_class($thought);
        $comments = $thought->comments;
        $img = $thought->image ? $thought->image : 'default.jpg';

        $thought->img = asset( 'storage/thoughts/'. $img); 
      
        return Inertia::render('Echoes/echoes', ['thought' => $thought, 'comments' => $comments]);
    }

    public function thoughtsByTag(Request $request)
    {
        $thoughts = app(ThoughtService::class)->showthoughtsByTag($request->tag); 

        return response()->json(['thoughts' => $thoughts]);
    }

    public function create() 
    {
        $tags = app(TagService::class)->tags(); 

        $item = get_class(new Thought());

        return Inertia::render('Create', ['tags' => $tags, 'item' => $item]);
    }

    
    public function store(Request $request)
    {
        $response  = app(ThoughtService::class)->savethought($request); 
    
 
        return redirect()->route('echo', ['id' => $response->id]);
    }
 
    public function update(Request $request, thought $thought)
    {
        
    }
 
    public function destroy(thought $thought)
    {
        
    }
}

// debo hacer que muestre los errores ( por ejemplo si no son los caracteres minimos necesarios)
 

 