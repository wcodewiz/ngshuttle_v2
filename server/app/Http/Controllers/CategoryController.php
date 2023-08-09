<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\utils\ControlApp;
use Illuminate\Http\Request;

class CategoryController extends ControlApp
{

    public function __construct(){
       parent::__construct(Category::class,["sub_category"],[],[],["name","id"]);
    }

    public function add(Request $request){
        $photos=parent::validateAndUpload($request,"icon",1,true,false,false,300,800,24);
        return parent::addRequest($request,[
        "name"=>"required",
    ],
    function() use ($request,$photos){
        $category=new Category();
        $category->name=$request->name;
        $category->icon=$photos;
        $category->save();

    },"Category added successfully");
    }


    public function update(Request $request,$id){
        $photo=parent::validateAndUpload($request,"icon",1,true,false,false,300,800,24);
        return parent::updateRequest($request,$id,["name"],function($clazz) use ($photo){
            if($photo){
                $clazz->icon=$photo;
            }
                return $clazz;
        });
    }



}