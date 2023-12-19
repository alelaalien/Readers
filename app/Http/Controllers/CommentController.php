<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; 
use App\Services\CommentService;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
   
    
    public function store(Request $request)
    {   
        $userId = Auth::id();
        $response = app(CommentService::class)
        ->saveComment($request->item, $request->content, $userId, $request->classType);
         return response()->json($response);
    }
 
    
    public function update(Request $request, string $id)
    {
        
    }
 
    public function destroy(string $id)
    {
         
    }
}
