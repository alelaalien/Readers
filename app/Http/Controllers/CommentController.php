<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; 
use App\Services\CommentService;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\Return_;

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
        $deleted = app(CommentService::class)->deleteComment($id);

            
        return response()->json($deleted);
     
    }
}
