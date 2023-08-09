<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Rating;
use App\Models\Specification;
use App\Models\StockTrend;
use App\utils\ControlApp;
use Illuminate\Http\Request;

class ProductController extends ControlApp
{

    public function __construct(){
        $admin=["vendor","spec","rating","stock","comment","sub_category"];
        $front=["vendor","spec","rating","stock","comment","sub_category"];
        parent::__construct(Product::class,$admin,$front,$front
        ,["vendor","id","subcategory","price","name"]);
     }

     public function add(Request $request){
         $photos=parent::validateAndUpload($request,"photo",7);
         return parent::addRequest($request,[
         "name"=>"required",
         "vendor"=>"required",
         "subcategory"=>"required",
         "quantity"=>"required",
         "price"=>"required",
         "color"=>"required",
         "description"=>"required",
         "origin"=>"required",
         "model"=>"required",
         "short_detail"=>"required"
     ],
     function() use ($request,$photos){
         $category=new Product();
         $category->name=$request->name;
         $category->vendor=$request->vendor;
         $category->subcategory=$request->subcategory;
         $category->quantity=$request->quantity;
         $category->price=$request->price;
         $category->description=$request->description;
         $category->pictures=$photos;
         if($request->has("buy_from")){
         $category->buy_from=$request->buy_from;
         }
         if($request->has("buy_price")){
         $category->buy_price=$request->buy_price;
         }
         $category->specs=-1;
         $category->save();

         $stock=new StockTrend();
         $stock->product=$category->id;
         $stock->views=rand(10,200);
         $stock->order_len=rand(10,200);
         $stock->order_category=2;
         $stock->save();


         $rating=new Rating();
         $rating->product=$category->id;
         $rating->new_rate=rand(2,4);
         $rating->old_rate=rand(2,4);
         $rating->rate_result=2;
         $rating->save();



         $spec=new Specification();
         $spec->color=$request->color;
         $spec->origin=$request->origin;
         $spec->model=$request->model;
         $spec->short_detail=$request->short_detail;
         $spec->save();
         $category->specs=$spec->id;
         $category->save();



     },"Product added successfully");
     }


     public function update(Request $request,$id){
        $photos=parent::validateAndUpload($request,"photo",7);
         return parent::updateRequest($request,$id,["name"=>"required",
         "vendor",
         "subcategory",
         "quantity",
         "price",
         "description"],function($clazz) use ($photos){
             if($photos){
                parent::UpdateDeletePhoto($clazz,"photo");
                $clazz->pictures=$photos;
                }


                 return $clazz;
         });
     }


}