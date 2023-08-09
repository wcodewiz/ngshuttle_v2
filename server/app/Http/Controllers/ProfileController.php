<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use App\utils\ShopApp;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    //

    public static function creatNewProfile(User $user){
        $profile=new Profile();
        $profile->user=$user->id;
        $username=$user->email;
        $username=explode("@",$username)[0];
        $username=$username.substr(ShopApp::hashes(),0,5);
        $profile->username=$username;
        $profile->save();
        return $profile;
    }

    public function update(Request $request,$id){
       $profile=Profile::where("id","=",$id)->first();
       if(!$profile) return response(["message"=>"invalid inprint"]);
       if($request->has("gender"))$profile->gender=$request->gender;
       if($request->has("date_of_birth"))$profile->date_of_birth=$request->date_of_birth;
       if($request->has("first_name"))$profile->first_name=$request->first_name;
       if($request->has("last_name"))$profile->last_name=$request->last_name;
       if($request->hasFile("photo")){

       }
       $profile->save();
       return response(["message"=>"profile saved successfully"]);
    }

}