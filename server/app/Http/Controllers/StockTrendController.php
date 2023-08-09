<?php

namespace App\Http\Controllers;

use App\Models\StockTrend;
use App\utils\ControlApp;
use Illuminate\Http\Request;

class StockTrendController extends ControlApp
{
    
    public function __construct(){
        $front=["product"];
        parent::__construct(StockTrend::class,$front,$front,
        $front
        ,["product","views","order_len","order_category"]);
     }

     public function add(Request $request){
         return parent::addRequest($request,[
         "product"=>"required",
         "views"=>"required",
         "order_len"=>"required",
         "order_category"=>"required",
     ],
     function() use ($request){
         $category=new StockTrend();
         $category->product=$request->product;
         $category->views=$request->views;
         $category->order_len=$request->order_len;
         $category->order_category=$request->order_category;
         $category->save();

     },"Stock Trend added successfully");
     }


     public function update(Request $request,$id){
         return parent::updateRequest($request,$id,["product","views","order_len","order_category"],function($clazz){
                 return $clazz;
         });
     }


}