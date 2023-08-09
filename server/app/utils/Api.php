<?php


namespace App\utils;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MerchantController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\SpecificationController;
use App\Http\Controllers\StockTrendController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorController;
use App\Models\TrendCategory;
use App\Models\User;
use App\utils\Helper;
use Illuminate\Support\Facades\Route;

class Api{

    public static function useGuestApi($prefix){

        Route::post("$prefix/account/create",[UserController::class,"create"]);
        Route::post("$prefix/account/login",[UserController::class,"login"]);
        Route::post("$prefix/account/forget/password",[UserController::class,"forgetPassword"]);
        Route::delete("$prefix/account/verify/password/{hash}",[UserController::class,"verifyForgetPassword"]);
        Route::post("$prefix/account/change/password/{id}",[UserController::class,"changePassword"]);
     
     
        Route::get("$prefix/search/{id}",[HomeController::class,"search"]);
        Route::get("$prefix/search/random/{id}",[HomeController::class,"searchRandom"]);
        Helper::generateRequest($prefix,[
            "category"=>["clazz"=>CategoryController::class,"methods"=>["getFront"
            ,"getFrontRandom","fetchFront"]],

            "sub/category"=>["clazz"=>SubCategoryController::class,"methods"=>["getFront"
            ,"getFrontRandom","fetchFront"]],

            "delievery/choose"=>["clazz"=>DeliveryController::class,"methods"=>["getFront"
            ,"getFrontRandom","fetchFront"]],

            "vendor"=>["clazz"=>VendorController::class,"methods"=>["getFront"
            ,"getFrontRandom","fetchFront"]],

            "trend/category"=>["clazz"=>TrendCategory::class,"methods"=>["getFront"
            ,"getFrontRandom","fetchFront"]],

            "specification"=>["clazz"=>SpecificationController::class,"methods"=>["getFront"
            ,"getFrontRandom","fetchFront"]],

            "stock/trends"=>["clazz"=>StockTrendController::class,"methods"=>["getFront"
            ,"getFrontRandom","fetchFront"]],


        ]);

    }

    public static function useAuthApi($prefix){
        Route::get($prefix."/auth",
        function(){
            $user=User::select(["users.id","users.email","email_verified","users.created_at"])
            ->with("profile")->with("vendor")->with("purchase")->with("application")
            ->where("id","=",auth()->id())->first();
            $role=ShopApp::getRole($user);
            $mail=$user->email_verified===null||$user->email_verified==="";
            if($role==="guest"){
             $role = "authenticated";
            }


            return response(["user"=>$user,"role"=>$role,"mail_verified"=>$mail]);
        });

      Route::delete("$prefix/account/verify/email/{hash}",[UserController::class,"verifyEmail"]);
        Route::delete("$prefix/account/send/email/{id}", [UserController::class, "resendMail"]);

        Helper::generateRequest($prefix,[
            "merchant"=>["clazz"=>MerchantController::class,"methods"=>["becomeamerchant"]]
        ]);
     

        Route::get($prefix."/rate/{id}/{value}",[RatingController::class,"rate"]);

    }
    public static function useMerchantApi($prefix){
                Helper::generateRequest($prefix,[
            "category"=>["clazz"=>CategoryController::class,"methods"=>["getMerchant"
            ,"getMerchantRandom","fetchMerchant"]],

            "sub/category"=>["clazz"=>SubCategoryController::class,"methods"=>["getMerchant"
            ,"getMerchantRandom","fetchMerchant"]],

            "vendor"=>["clazz"=>VendorController::class,"methods"=>["getMerchant"
            ,"getMerchantRandom","fetchMerchant","delete","recover","add","update"]],

            "trend/category"=>["clazz"=>TrendCategory::class,"methods"=>["getMerchant"
            ,"getMerchantRandom","fetchMerchant"]],

            "delievery/choose"=>["clazz"=>DeliveryController::class,"methods"=>["getMerchant"
            ,"getMerchantRandom","fetchMerchant","delete","recover","update","add"]],


            "specification"=>["clazz"=>SpecificationController::class,"methods"=>["getMerchant"
            ,"getMerchantRandom","fetchMerchant","delete","recover","remove","add","update"]],

            "stock/trends"=>["clazz"=>StockTrendController::class,"methods"=>["getMerchant"
            ,"getMerchantRandom","fetchMerchant"]],
        ]);

    }
    public static function useAdminApi($prefix){
        Helper::generateRequest($prefix,[
            "category"=>["clazz"=>CategoryController::class,"methods"=>["get"
            ,"add","getRandom","fetch","find","delete","recover","remove","update"]],

            "sub/category"=>["clazz"=>SubCategoryController::class,"methods"=>["get"
            ,"add","getRandom","fetch","find","delete","recover","remove","update"]],

            "vendor"=>["clazz"=>VendorController::class,"methods"=>["get"
            ,"getRandom","fetch","find","remove","update"]],

            "trend/category"=>["clazz"=>TrendCategory::class,"methods"=>["get"
            ,"add","getRandom","fetch","find","delete","recover","update","remove"]],

            "delievery/choose"=>["clazz"=>DeliveryController::class,"methods"=>["get"
            ,"getRandom","fetch","find","remove"]],

            "specification"=>["clazz"=>SpecificationController::class,"methods"=>["get"
            ,"add","getRandom","fetch","update","find",]],

            "stock/trends"=>["clazz"=>StockTrendController::class,"methods"=>["get"
            ,"add","getRandom","fetch","find","update","delete","recover","remove"]],

            "merchant"=>["clazz"=>MerchantController::class,"methods"=>["get"
            ,"getRandom","fetch","find","delete","recover","remove"]],



        ]);

    }
    public static function useMasterApi($prefix){
        Route::delete("$prefix/account/ban/user/{id}",[UserController::class,"banUser"]);
        Route::delete("$prefix/account/unban/user/{id}",[UserController::class,"unBanUser"]);
        Route::delete("$prefix/account/block/user/{id}",[UserController::class,"blockUser"]);
        Route::delete("$prefix/account/unblock/user/{id}",[UserController::class,"unBlock"]);

    }





}