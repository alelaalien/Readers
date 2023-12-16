<?php

namespace App\Http\Controllers;

use App\Models\UserDetail;
use Illuminate\Http\Request;

class UserDetailController extends Controller
{
    public function show(string $id)
    {
        $details = UserDetail::find($id);
        return $details;
    }
}
