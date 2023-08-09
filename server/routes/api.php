<?php

use App\utils\Api;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
$prefix="/v2";
$auth_santum='auth:sanctum';

Route::middleware("isGuest")->group(function() use ($prefix){
    Api::useGuestApi($prefix);
});


Route::middleware($auth_santum)->group(function() use ($prefix){
    Api::useAuthApi($prefix);
});

Route::middleware(["isAdmin",$auth_santum])->group(function() use ($prefix){
    Api::useAdminApi($prefix);
});

Route::middleware(["isMaster",$auth_santum])->group(function() use ($prefix){
    Api::useMasterApi($prefix);
});

Route::middleware(["isMerchant",$auth_santum])->group(function() use ($prefix){
    Api::useMerchantApi($prefix);
});