<?php

namespace App\Http\Controllers;

use App\Services\ReplyService;
use Illuminate\Http\Request;

class ReplyController extends Controller
{
    public function store(Request $request)
    {
        $comment_id = $request->commentId;
        $content = $request->content; 
        $response = app(ReplyService::class)->saveReply($comment_id, $content);
       
        return  $response ;
    }

    public function destroy(String $id)
    {
        $result = app(ReplyService::class)->deleteReplyById($id);
        return response()->json($result);
    }

    public function update(Request $request, string $id)
    {   

        $response = app(ReplyService::class)->updateReply($id, $request->content);

        return response()->json( $response);
    }
 
}
