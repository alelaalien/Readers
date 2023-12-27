<?php

namespace App\Services;

use App\Models\Reportable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReportableService{

    public function saveReport($data)
    {

        $reason = $data->reason;
        $classType = $data->item;
        $itemId = $data->itemId; 

       $validator = Validator::make(['reason' => $reason],
       ['reason' => 'required']);

        if ($validator->fails()) {
            
            return 'Limit exceded';
        }

        $report = new Reportable(); 
        $report->reported_by = Auth::id();
        $report->reason = $reason;
        $report->reportable_type = $classType;
        $report->reportable_id = $itemId;

        try {
             
            $report->save();
            
            return 'ok';

        } catch (\Throwable $th) {
            
            return 'error';
        }
        

        
         
    }

    public function reportsByUser()
    {
        $id = Auth::id();

        $reports = Reportable::where('reported_by', $id);

        return $reports;
    }

    public function cancelReport(String $reportId)
    {   
        try {
            $report = Reportable::findOrFail($reportId);
            $report->delete();
            return 'ok';
            
        } catch (\Throwable $th) {
            
            return 'error';
        } 
    }
    public function ItemReported($item)
    {
        $class = get_class($item);
        $itemId = $item->id;

        $reports = Reportable::where('reportable_type', $class)
                    ->where('reportable_id', $itemId);
        return $reports;
    }

}