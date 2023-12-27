<?php

namespace App\Http\Controllers;

use App\Models\Reportable;
use Illuminate\Http\Request;
use App\Services\ReportableService;

class ReportableController extends Controller
{
    
    public function store(Request $request)
    { 
        $result = app(ReportableService::class)->saveReport($request);

        return response()->json($result); 
    }

    public function destroy(String $reportId)
    {
        $result = app(Reportable::class)->cancelReport($reportId);

        return response()->json($result);
    }

    public function show(Request $request)
    {
        $result = app(Reportable::class)->ItemReported($request);

        return response()->json($result);
    }
}
