<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use App\utils\ControlApp;
use Illuminate\Http\Request;

class DeliveryController extends ControlApp
{

    public function __construct(){
        parent::__construct(Delivery::class,["vendor"],[],[],["location","name","states"]);
     }

     public function add(Request $request){
         return parent::addRequest($request,[
         "name"=>"required,unique:deliveries",
         "vendor"=>"required",
         "location"=>"required",
         "state"=>"required",
     ],
     function() use ($request){
         $category=new Delivery();
         $category->name=$request->name;
         $category->vendor=$request->vendor;
         $category->locations=$request->location;
         $category->states=$request->state;
         $category->save();

     },"Logistics created successfully");
     }


     public function update(Request $request,$id){
         return parent::updateRequest($request,$id,["name"],function($clazz) use ($request){
            if($request->has("location")){
                $oldLocation=$clazz->locations;
                $oldLocation=strtolower($oldLocation);
                if($oldLocation!==""){
                if(strrpos($oldLocation,$request->location)!==false){
                    $oldLocation=$oldLocation.",$request->location";
                }
            }else{
                $oldLocation="$request->location";
                $clazz->locations=$oldLocation;
            }
            }


            if($request->has("state")){
                $oldLocation=$clazz->states;
                $oldLocation=strtolower($oldLocation);
                if($oldLocation!==""){
                if(strrpos($oldLocation,$request->states)!==false){
                    $oldLocation=$oldLocation.",$request->state";
                }
            }else{
                $oldLocation="$request->state";
                $clazz->states=$oldLocation;
            }
            }



            return $clazz;
         },"Logistics updated");
     }


}