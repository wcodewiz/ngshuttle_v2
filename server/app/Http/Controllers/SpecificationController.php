<?php

namespace App\Http\Controllers;

use App\Models\Specification;
use App\utils\ControlApp;
use Illuminate\Http\Request;

class SpecificationController extends ControlApp
{
    
    public function __construct(){
        $front=[];
        parent::__construct(Specification::class,$front,$front,
        $front
        ,["origin","model","color","short_detail"]);
     }

     public function add(Request $request){
         return parent::addRequest($request,[
            "origin"=>"required"
            ,"model"=>"required",
            "color"=>"required",
            "short_detail"=>"required"
             ],
     function() use ($request){
         $category=new Specification();
         $category->origin=$request->origin;
         $category->model=$request->model;
         $category->color=$request->color;
         $category->short_detail=$request->short_detail;
         $category->save();

     },"Specification added successfully");
     }


     public function update(Request $request,$id){
         return parent::updateRequest($request,$id,["origin","model","color","short_detail"],function($clazz){
                 return $clazz;
         });
     }


}