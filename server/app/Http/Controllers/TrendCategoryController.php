<?php

namespace App\Http\Controllers;

use App\Models\TrendCategory;
use App\utils\ControlApp;
use Illuminate\Http\Request;

class TrendCategoryController extends ControlApp
{
    public function __construct(){
        $front=[];
        parent::__construct(TrendCategory::class,$front,$front,
        $front
        ,["trend_name","rate","view"]);
     }

     public function add(Request $request){
         return parent::addRequest($request,[
         "trend_name"=>"required",
         "rate"=>"required",
         "views"=>"required",
     ],
     function() use ($request){
         $category=new TrendCategory();
         $category->trend_name=$request->trend_name;
         $category->rate=$request->rate;
         $category->views=$request->views;
         $category->save();

     },"Trend Category added successfully");
     }


     public function update(Request $request,$id){
         return parent::updateRequest($request,$id,["trend_name","rate","views"],function($clazz){
                 return $clazz;
         });
     }



}