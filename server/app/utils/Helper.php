<?php

namespace App\utils;

use Illuminate\Support\Facades\Route;

class Helper{

    public  static function  newPath($path){
        $paths=explode("/",$path);
        $start="/";
        foreach($paths as $mpath){
            if($mpath!==""){
            $index='<?php'."\n\n\n\n\n\n\n\n".' header("Location:/");'."\n\n\n\n\n".' ?>';
$start.=$mpath."/";
$fpath=public_path($start);
if(!file_exists($fpath)){
mkdir($fpath);
file_put_contents($fpath."index.php",$index);
}
}
}
return $path;
}

public static function nouns($value,$name,$prefix="s"){
return $value>1?"$value ".$name.$prefix:"$value $name";
}

public static function generateRequest($prefix,$arrMethods){

foreach($arrMethods as $method=>$clazz){
if(is_string($clazz)) throw new \Exception("processing routes failed");

$mclass=$clazz["clazz"];
$methods=$clazz["methods"];


foreach($methods as $mt){
$mt=strtolower($mt);
if($mt==="get"){
$pathGet="$prefix/$method/get";
Route::get($pathGet,[$mclass,"get"]);
}
elseif($mt==="getrandom"){
$pathGetRandom="$prefix/$method/get/random";
Route::get($pathGetRandom,[$mclass,"getRandom"]);
}
elseif($mt==="becomeamerchant"){
$pathGetFrontRandom="$prefix/$method/become/merchant";
Route::post($pathGetFrontRandom,[$mclass,"becomeAMerchant"]);
}
elseif($mt==="getfrontrandom"){
$pathGetFrontRandom="$prefix/$method/get/front/random";
Route::get($pathGetFrontRandom,[$mclass,"getFrontRandom"]);
}elseif($mt==="getmerchantrandom"){
$pathGetMerchantRandom="$prefix/$method/get/merchant/random";
Route::get($pathGetMerchantRandom,[$mclass,"getMerchantRandom"]);
}elseif($mt==="fetch"){
$pathFetch="$prefix/$method/fetch/{id}";
Route::get($pathFetch,[$mclass,"fetch"]);
}elseif($mt==="getmerchant"){
$pathMerchant="$prefix/$method/get/merchant";
Route::get($pathMerchant,[$mclass,"getMerchant"]);
}elseif($mt==="fetchmerchant"){
$pathFetchMerchant="$prefix/$method/fetch/{id}/merchant";
Route::get($pathFetchMerchant,[$mclass,"fetchMerchant"]);
}elseif($mt==="add"){
$pathAdd="$prefix/$method/add";
Route::post($pathAdd,[$mclass,"add"]);
}elseif($mt==="update"){
$pathUpdate="$prefix/$method/update/{id}";
Route::post($pathUpdate,[$mclass,"update"]);
}elseif($mt==="getfront"){
$pathFront="$prefix/$method/get/front";
Route::get($pathFront,[$mclass,"getFront"]);
}elseif($mt==="fetchfront"){
$pathFetchFront="$prefix/$method/fetch/{id}/front";
Route::get($pathFetchFront,[$mclass,"fetchFront"]);
}elseif($mt==="find"){
$pathFind="$prefix/$method/find/{query}";
Route::get($pathFind,[$mclass,"find"]);
}elseif($mt==="delete"){
$pathDelete="$prefix/$method/delete/{id}";
Route::delete($pathDelete,[$mclass,"delete"]);
}elseif($mt==="recover"){
$pathRecover="$prefix/$method/recover/{id}";
Route::delete($pathRecover,[$mclass,"recover"]);
}elseif($mt==="remove"){
$pathDeleteForever="$prefix/$method/remove/{id}";
Route::delete($pathDeleteForever,[$mclass,"remove"]);
}

}






}


}



}