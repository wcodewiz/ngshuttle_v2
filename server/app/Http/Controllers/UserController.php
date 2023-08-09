<?php

namespace App\Http\Controllers;

use App\Models\PasswordReset;
use App\Models\User;
use App\Models\UserApplication;
use App\utils\ShopApp;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PasswordChange{
    public $email="";
    public $hash="";
    public $date="";
}

class UserController extends Controller
{

    public function create(Request $request){
    $validate=Validator::make($request->all(),[
        "email"=>"required|email|unique:users",
        "password"=>"required|min:6"
    ]);
    if($validate->fails()) return response($validate->messages()->all(),403);

        $user=new User();
        $user->email=$request->email;
        $user->password=Hash::make($request->password,[
        'memory' => 1024,
        'time' => 2,
        'threads' => 2
    ]);
        $user->save();
        $profile=ProfileController::creatNewProfile($user);
        $time=time();
        $hash=sha1($time.ShopApp::hashes());
        $pchange=new PasswordChange();
        $pchange->email=$user->id;
        $pchange->date=$time;
        $pchange->hash=$hash;

        $transport=json_encode($pchange);
        $transport=ShopApp::a_base($transport);
        $vlink=env("CLIENT_HOST")."/account/verify/email/$transport";
        $user->email_verified=Hash::make($hash);
       
        $user->ability="-";
        $user->save();
        
        $ability=ShopApp::getAbility($user);
        $token=ShopApp::createAbility($user,$ability);
        $user->ability="-";
        $user->save();


    try{
        EmailController::sendWelcomeMail($user);
        EmailController::sendVerifyEmailMail($user,$vlink);
    }catch(Exception $e){
        echo "sending mail failed!!  ".$e->getMessage();
    }finally{
        $res=[];
        $role=ShopApp::getRole($user);
             if($role==="guest"){
             $role = "authenticated";
        }

        $userApplication = new UserApplication();
        $userApplication->user = $user->id;
        $userApplication->save();
        
        $res["role"] = $role;
        $res["email"]=$user->email;
        $res["id"]=$user->id;
        $res["token"]=$token;
        $mail=$user->email_verified===""||$user->email_verified===null;
        $res["mail_verified"]=$mail;
        $res["profile"]=$profile;
        $res["application"] = $userApplication;
        
        Auth::loginUsingId($user->id);
        return response(["message"=>"account created",...$res]);
    }

    }
    public function login(Request $request){
        $validate=Validator::make($request->all(),[
            "email"=>"required|email",
            "password"=>"required"
        ]);
        if($validate->fails()) return response($validate->messages()->all(),403);
        $user=User::where("email","=",$request->email)->with("profile")->with("vendor")->with("purchase")->with("application")->first();
        if(!$user) return response(["message"=>"invalid user or doesn't exist!!"],403);

        $verify=Hash::check($request->password,$user->password);
        if(!$verify) return response(["message"=>"invalid password or incorrect combinations"],403);

        if(!$user->canLogin) return response(["message"=>"Sorry you cannot login in this time
        , contact administrator","banned"=>true],403);

        if($user->isBlocked) return response(["message"=>"account is disabled permanently,
        contact support","blocked"=>true],403);

        $ability=ShopApp::getAbility($user);

        if(Hash::needsRehash($user->password,["memory"=>1024,"time"=>2,"threads"=>2])){
            $user->password=Hash::make($request->password,["memory"=>1024,"time"=>2,"threads"=>2]);
            $user->ability=$ability;
            $user->save();
        }


        try{
        EmailController::sendLoginMail($user);
        }catch(Exception $e){
        echo "sending mail failed";
        }finally{
                $user->last_seen=time();
                $user->ability=$ability;
                $user->save();
                $res=[];
        $role=ShopApp::getRole($user);
             if($role==="guest"){
             $role = "authenticated";
        }
 
               $res["role"] = $role;
                $res["email"]=$user->email;
                $res["id"]=$user->id;
                $res["profile"]=$user->profile;
                $mail=$user->email_verified===""||$user->email_verified===null;
    
                $res["mail_verified"]=$mail;

                $res["vendor"]=$user->vendor;
                $res["purchase"]=$user->purchase;
                $res["token"]=ShopApp::createAbility($user,ShopApp::getAbility($user));;

                Auth::loginUsingId($user->id);
                return response(["message"=>"login success",...$res]);
        }

    }
    public function forgetPassword(Request $request){
        $validate=Validator::make($request->all(),[
            "email"=>"required|email",
        ]);
        if($validate->fails()) return response($validate->messages()->all(),403);

        $user=User::where("email","=",$request->email)->with("profile")->with("vendor")->with("purchase")->with("application")->first();
        if(!$user) return response(["message"=>"invalid user or doesn't exist!!"],403);

        $passwords=PasswordReset::where("id","=",$user->id)->first();
        if($passwords){
            $passwords->delete();
        }

        $time=time();
        $hash=sha1($time.ShopApp::hashes());
        $pchange=new PasswordChange();
        $pchange->email=$user->id;
        $pchange->date=$time;
        $pchange->hash=$hash;

        if(PasswordResetController::createReset($user->id,$hash,$time)){
        $transport=json_encode($pchange);
        $transport=ShopApp::a_base($transport);
        $vlink=env("CLIENT_HOST")."/account/verify/password/$transport";
        try{
        EmailController::sendVerifyPasswordMail($user,$vlink);
        }catch(Exception $e){
            echo $e->getMessage();

        }finally{
            return response(["message"=>"recovery email sent!!"]);
        }

    }

    }

    public function resendMail($id){
        $user=User::where("id","=",$id)->first();
        if(!$user) return response(["message"=>"user does not exist"],400);
       $time=time();
        $hash=sha1($time.ShopApp::hashes());
        $pchange=new PasswordChange();
        $pchange->email=$user->id;
        $pchange->date=$time;
        $pchange->hash=$hash;
        $user->email_verified=Hash::make($hash);

        $user->save();
        
        $transport=json_encode($pchange);
        $transport=ShopApp::a_base($transport);
        $vlink=env("CLIENT_HOST")."/account/verify/email/$transport";
       
        
      try{
        EmailController::sendVerifyEmailMail($user,$vlink);
            return response(["message" => "email sent", "status" => true]);   
    } catch (Exception $e) {
            return response(["message" => "sending email failure", "status" => false],400);   
        }

    }

    public function verifyForgetPassword($hash){
        $hash=ShopApp::d_base($hash);
        try{
        $transport=json_decode($hash);
        $check=PasswordReset::where("user","=",$transport->email)->where("time","=",$transport->date)->first();

        if(!$check && !Hash::check($transport->hash,$check->verify_hash))
        return response(["message"=>"incorrect combinations"]);

        if($check->expired)
        return response(["message"=>"finger print expired!!"],403);


        $user=User::where("id","=",$transport->email)->with("profile")->with("vendor")->with("purchase")->with("application")->first();
        $res=[];
              $role=ShopApp::getRole($user);
             if($role==="guest"){
             $role = "authenticated";
        }
 
      $res["role"] = $role;
 
        $res["email"]=$user->email;
        $res["id"]=$user->id;
        $res["profile"]=$user->profile;
        $res["vendor"]=$user->vendor;
        $res["purchase"]=$user->purchase;
        $mail=$user->email_verified===""||$user->email_verified===null;
        $res["mail_verified"]=$mail;

        Auth::loginUsingId($user->id);
        $check->expired=true;
        $check->save();
        return response(["valid"=>true,...$res]);

    }catch(Exception $e){
        return response(["valid"=>false,"code"=>400,"message"=>"invalid fingerprint",
         "payload"=>$hash],400);
        }

    }

    public function changePassword(Request $request,$id){
        $validate=Validator::make($request->all(),[
            "password"=>"required"
        ]);
        if($validate->fails()) return response($validate->messages()->all(),403);

        $user=User::where("id","=",$id)->with("profile")->with("purchase")->with("vendor")->with("application")->first();
        if(!$user) return response(["message"=>"user does not exist"],400);

        $user->password=Hash::make($request->password,[
            "memory"=>1024,
            "time"=>2,
            "threads"=>2
        ]);
        try{
            EmailController::sendPasswordChangedMail($user);
            }catch(Exception $e){
                echo $e->getMessage();
            }finally{
                $user->save();
        $res=[];
              $role=ShopApp::getRole($user);
             if($role==="guest"){
             $role = "authenticated";
        }
 
      $res["role"] = $role;
 
        $res["email"]=$user->email;
        $res["id"]=$user->id;
        $res["profile"]=$user->profile;
        $res["vendor"]=$user->vendor;
        $res["purchase"]=$user->purchase;
        $mail=$user->email_verified===""||$user->email_verified===null;
        $res["mail_verified"]=$mail;

                Auth::loginUsingId($user->id);
                return response(["message"=>"login success",...$res]);
            }



    }

    public function verifyEmail($hash){
        $hash=ShopApp::d_base($hash);
        try{
        $transport=json_decode($hash);
        $user=User::where("id","=",$transport->email)->with("profile")->with("purchase")->with("vendor")->with("application")->first();

        if(!$user) return response(["message"=>"user does not exist"],400);

        if(!Hash::check($transport->hash,$user->email_verified))
        return response(["message"=>"incorrect combinations or token expired"],400);

        $res=[];
              $role=ShopApp::getRole($user);
             if($role==="guest"){
             $role = "authenticated";
        }
 
      $res["role"] = $role;
 
        $res["email"]=$user->email;
        $res["id"]=$user->id;
        $res["profile"]=$user->profile;
        $res["vendor"]=$user->vendor;
        $res["purchase"]=$user->purchase;
        $user->email_verified=null;
        $user->save();

        return response(["valid"=>true,...$res]);
        }catch(Exception $e){
        return response(["valid"=>false,"code"=>400,"message"=>"invalid fingerprint"],400);
        }

    }
    public function banUser($id){
        $user=User::where("id","=",$id)->first();
        if(!$user) return response(["message"=>"user does not exist"],400);
        $user->canLogin=true;
        $user->save();
        return response(["message"=>"user suspended!!"]);
    }
    public function unBanUser($id){
        $user=User::where("id","=",$id)->first();
        if(!$user) return response(["message"=>"user does not exist"],400);
        $user->canLogin=false;
        $user->save();
        return response(["message"=>"user suspension lifted!!"]);

    }

    public function blockUser($id){
        $user=User::where("id","=",$id)->first();
        if(!$user) return response(["message"=>"user does not exist"],400);
        $user->isBlocked=true;
        $user->save();
        return response(["message"=>"user account disabled permanently!!"]);

    }

    public function unBlock($id){
        $user=User::where("id","=",$id)->first();
        if(!$user) return response(["message"=>"user does not exist"],400);
        $user->isBlocked=false;
        $user->save();
        return response(["message"=>"user account freed!!"]);
    }


}