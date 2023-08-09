<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use App\utils\ControlApp;
use Illuminate\Http\Request;

class SubCategoryController extends ControlApp
{


    public function __construct(){
        $front=["category","product"];
        parent::__construct(SubCategory::class,$front,$front,
        $front
        ,["name","id","category","meta_group"]);
     }

     public function add(Request $request){
         $photos=parent::validateAndUpload($request,"icon",1,true,false,false,300,800,24);
         return parent::addRequest($request,[
         "name"=>"required",
         "category"=>"required",
         "meta_group"=>"required"
     ],
     function() use ($request,$photos){
         $category=new SubCategory();
         $category->name=$request->name;
         $category->icon=$photos;
         $category->category=$request->category;
        $category->meta_group = $request->meta_group;

         $category->save();

     },"Sub Category added successfully");
     }


     public function update(Request $request,$id){
         $photo=parent::validateAndUpload($request,"icon",1,true,false,false,300,800,24);
         return parent::updateRequest($request,$id,["name","category","meta_group"],function($clazz) use ($photo){
             if($photo){
                 $clazz->icon=$photo;
             }
                 return $clazz;
         });
     }





}