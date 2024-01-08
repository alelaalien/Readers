<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use Inertia\Inertia;
use App\Services\TagService;
use Illuminate\Http\Request;
use App\Services\PoemService;
use Illuminate\View\View;

class PoemController extends Controller
{
     
    public function index()
    {   
        
        $poems = app(PoemService::class)->showPoems(); 

        $tags = app(TagService::class)->tagsAndPoems();

        return Inertia::render('Poems/index', ['poems' => $poems, 'tags' => $tags]);
   
    }
    public function poem($id)
    {   
        
        $poem = app(PoemService::class)->poem($id); 
        $poem->class= get_class($poem);
        $comments = $poem->comments;

        return Inertia::render('Poems/poems', ['poem' => $poem, 'comments' => $comments]);
    }

    public function poemsByTag(Request $request)
    {
        $poems = app(PoemService::class)->showPoemsByTag($request->tag); 

        return response()->json(['poems' => $poems]);
    }

    public function create() 
    {
        $tags = app(TagService::class)->tags(); 

        $item = get_class(new Poem());

        return Inertia::render('Create', ['tags' => $tags, 'item' => $item]);
    }

    
    public function store(Request $request)
    {
        $response  = app(PoemService::class)->savePoem($request); 
    
 
        return redirect()->route('poem', ['id' => $response->id]);
    }
 
    public function update(Request $request, Poem $poem)
    {
        
    }
 
    public function destroy(Poem $poem)
    {
        
    }
}

para hacer: se debe ver la imagen del usuario en la vista del poema o la de default si no tiene.
debo hacer que muestre los errores ( por ejemplo si no son los caracteres minimos necesarios)
hacer comprobaciones de seguridad necesarios para cada input.
hacer el scroll c: 
mover el boton de add new para que sea flotante en pantallas pequeñas.