<?php

namespace App\Http\Controllers;


use App\Models\Merchant;
use App\Models\Profile;
use App\Models\UserApplication;
use App\utils\ControlApp;
use Illuminate\Http\Request;

class IdentityUser{
    public $proof_of_address;
    public $gov_issued_id;
    public $proof_of_merchant;
}

class MerchantController extends ControlApp
{
    
    public function __construct(){
        parent::__construct(Merchant::class,["user"],[],[],
        ["user","address1","address2","city","state","country","ssn"]);
    }

    public function becomeAMerchant(Request $request){
        $proof_of_address=parent::validateAndUpload($request,"proof_of_address",2,false
        ,false,true,300,800,200,"jpg,jpeg");
        $gov_issued_id=parent::validateAndUpload($request,"gov_issued_id",2,false
        ,false,true,300,800,200,"jpg,jpeg");
        $proof_of_merchant=parent::validateAndUpload($request,"proof_of_merchant",2,false
        ,false,true,300,800,200,"jpg,jpeg");

        $userphoto=parent::validateAndUpload($request,"user_photo",2,false
        ,false,true,300,800,200,"jpg,jpeg");




        $merchant = new IdentityUser();
        $merchant->gov_issued_id = $gov_issued_id;
        $merchant->proof_of_address = $proof_of_address;
        $merchant->proof_of_merchant = $proof_of_merchant;
        
        $userdoc = json_encode($merchant);


        return parent::addRequest($request,
            [
              "address1"=>"required", 
              "address2"=>"required",
               "city"=>"required",
                "state"=>"required",
                 "country"=>"required",
                  "ssn"=>"required",
                  "proof_of_address-0"=>"required|mimes:jpeg,jpg",
                  "gov_issued_id-0"=>"required|mimes:jpeg,jpg",
                  "proof_of_merchant-0"=>"required|mimes:jpeg,jpg",
                  "user_photo-0"=>"required|mimes:jpeg,jpg",

                ],function () use ($request,$userdoc, $userphoto) {
                $merch =new Merchant();
                $merch->user = auth()->id();
                $merch->id_docs=$userdoc;
                $merch->user_photo=$userphoto;
                $merch->address1=$request->address1;
                $merch->address2=$request->address2;
                $merch->city=$request->city;
                $merch->state=$request->state;
                $merch->country=$request->country;
                $merch->ssn = $request->ssn;
                $merch->save();

            

                $profile = UserApplication::where("user", "=", auth()->id())->first();
                $profile->isMerchantApplied = true;      
                $profile->save();

                return $merch;
    },"application sent! this may take 3 to 5 working days to verify your account");
    }


}