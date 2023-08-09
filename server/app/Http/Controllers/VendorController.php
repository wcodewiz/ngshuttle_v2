<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use App\utils\ControlApp;
use App\utils\ShopApp;
use Illuminate\Http\Request;

class VendorController extends ControlApp
{

    public function __construct(){
        $front=["user"];
        parent::__construct(Vendor::class,$front,$front,
        $front
        ,["name","id","location","owner"]);
     }

     public function add(Request $request){
         $photos=parent::validateAndUpload($request,"photo",1,false,true,false,300,800,24);
         return parent::addRequest($request,[
         "name"=>"required",
         "location"=>"required",
     ],
     function() use ($request,$photos){
         $category=new Vendor();
         $category->name=$request->name;
         $category->location=$request->location;
         $category->owner=auth()->id();
         $category->photo=$photos;
         $category->navigation=ShopApp::ip();
         $category->save();

     },"Vendor added successfully");
     }


     public function update(Request $request,$id){
         $photo=parent::validateAndUpload($request,"icon",1,false,true,false,300,800,24);
         return parent::updateRequest($request,$id,["name","location"],function($clazz) use ($photo){
             if($photo){
                 $clazz->photo=$photo;
             }
                 return $clazz;
         });
     }




}