<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use App\Services\PoemService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\View\View;

class PoemController extends Controller
{
   
    public function showPoems( $id) 
    {   
        
        $poem= app(PoemService::class)->showPoems($id);
         

        return view('pages.poem-page', compact('poem'));
    }
    public static function showLimit($limit)
    {
      
        return Poem::select('poems.title', 'poems.id')
                    ->orderBy('created_at')
                    ->take($limit)
                    ->get();

    }  
}
