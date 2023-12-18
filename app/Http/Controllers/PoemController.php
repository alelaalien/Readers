<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use App\Services\PoemService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PoemController extends Controller
{
     
    public function index()
    {   
        $id = 1;
        $poem = app(PoemService::class)->showPoems($id);

        return Inertia::render('Poems/poems', ['poem' => $poem]);
    }

    
    public function store(Request $request)
    {
        
    }
 
    public function update(Request $request, Poem $poem)
    {
        
    }
 
    public function destroy(Poem $poem)
    {
        
    }
}
