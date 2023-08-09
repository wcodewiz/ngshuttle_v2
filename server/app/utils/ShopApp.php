<?php

namespace App\utils;

use App\Models\User;
use App\utils\Helper;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;
use PHPMailer\PHPMailer\PHPMailer;

class ShopApp{

    public  static  function  sendMail($subject,$body,$to,$attachmentPath=[]){
                $mail=new PHPMailer();
                $mail->isSMTP();
                $mail->Host="".env("EMAIL_HOST");
                $mail->Username=env("EMAIL_USERNAME");
                $mail->Password=env("EMAIL_PASSWORD");
                $mail->SMTPDebug=0;
                $mail->SMTPSecure=PHPMailer::ENCRYPTION_SMTPS;
                $mail->Port=intval(env("EMAIL_PORT"));
                $mail->setFrom("".env("EMAIL_FROM"),"".env("EMAIL_SIDE_LABEL"));
                $mail->addAddress($to,"".env("EMAIL_SIDE_LABEL"));
                $mail->SMTPAuth=true;
                $mail->isHTML(true);
                $mail->Subject=$subject;
                $mail->msgHTML($body);
                foreach ($attachmentPath as $path){
                    $mail->addAttachment($path);
                }
                $mail->addReplyTo(env("EMAIL_REPLY_TO"));
                $mail->ContentType=PHPMailer::CONTENT_TYPE_TEXT_HTML;
                return $mail->send()?true:false;
}

    public static  function res($path): string{
                return "uploads/resources/$path";
     }

         public static  function resPhotos($path): string{
                return "uploads/resources/normal/images/$path";
     }
         public static  function resThumbs($path): string{
                return "uploads/resources/$path";
     }
              public static  function resZoom($path): string{
                return "uploads/resources/hd/images/$path";
     }


    public  static function  a_base($string): array|string
    {
        return str_replace("=","+",base64_encode($string));
    }
    public  static  function d_base($hash): bool|string
    {
        $hash=str_replace("+","=",$hash);
        return base64_decode($hash);
    }
    public  static  function  month($index): string
    {
        $months=["JANUARY","FEBRUARY","MARCH","APRIL","MAY"
        ,"JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
        return $index>count($months)?$months[count($months)-1]:$months[$index];
    }

    public  static  function pageForbidden($message): \Illuminate\Http\JsonResponse
    {
        return !is_array($message)?response()->json(["msg"=>"access denied. $message"],403)
            :response()->json(["message"=> $message,],403);
    }


    public  static  function page404($message=""): \Illuminate\Http\JsonResponse
    {
        return response()->json(["message"=>"not found. $message"],404);
    }

    public  static function  adminList(): array
    {
        return ["samuelclinton975@gmail.com","admin@admin.com","administrator@admin.com"];
    }



    public  static  function  isMe($id):bool{
        return auth()->user()->id===intval($id);
    }

    public static function getRole($user=null): string{
        if(self::isAdmin($user)) return "admin";
        if(self::isMaster($user)) return "master";
        
        return "guest";
    }

    public static function isMaster(User $user=null): bool{
        $log=self::userAbility(self::appName().":master",$user);
        $able=$user!==null?$user->ability==="*":$log;
        return  $able;
    }

    public static function isAdmin(User $user=null): bool{
        $logs=self::userAbility(self::appName().":admin",$user);
        $able=$user!==null?$user->ability==="|":$logs;
        return $able;
    }

    public static function isMerchant(User $user=null): bool{
        $logs=self::userAbility(self::appName().":merchant",$user);
        $able=$user!==null?$user->ability==="|":$logs;
        return $able;
    }


    public  static  function  user(){
        return auth()->user();
    }


    public static function  userAbility(string $token,$user=null):bool{
        if($user===null) $user=auth()->user();
        else if($user==null)return  false;
        return $user->abilities($token);
    }

    public  static function  getAbility($user){
        if(is_string($user)){
            if(in_array(strtolower($user),self::adminList())){
                return "*";
            }
            return "-";
        }else{

            if(in_array(strtolower($user->ename),self::adminList())){
                    return "*";
        }
    }
        return $user->ability;
    }

    public  static  function createAbility(User $user,$abilities=""): string{
        $abilities=$abilities===""?self::appName().":guest":$abilities;
        if($user->ability){
            if($user->ability==="*"){
                $abilities=self::appName().":master";
            }
            elseif($user->ability==="|"){
                $abilities=self::appName().":admin";

            }elseif($user->ability==="$"){
                $abilities=self::appName().":merchant";
            }else{
                $abilities=self::appName().":guest";
            }
        }
        else
        {
            if(in_array(strtolower($user->ename),self::adminList())){
                $abilities=self::appName().":master";
            }else{
                $abilities=self::appName().":$abilities";
            }
        }

        return $user->createToken($user->email." ".self::appName()."_token",[$abilities])->plainTextToken;
    }



    public static  function appName(){
        return env("APP_NAME");
    }



    public  static  function  islogin(): bool{
        return Auth::check();
    }

    public  static function filenameHashes(UploadedFile $file){
        if($file->getClientMimeType()!==null)
        $type=explode("/",$file->getClientMimeType())[1];
        $name= self::hashes();
        return $name.env("APP_NAME").date("d-m-Y").".$type";
    }


    public  static  function  hashes(): string{
        $str=rand(3000,30000).time().rand(3000,30000).rand(3000,30000).time();
        return "".sha1($str);
    }


    public  static  function createThumb(UploadedFile $file,$width=100,$filename="",$path=""){
        return self::createImage($file,$filename,$width,$path);
    }
    public  static  function createImage(UploadedFile $file,$filename="",$width=500,$path=""){
        $filename=$filename===""?self::filenameHashes($file):$filename;
        $image=Image::make($file->getRealPath());
        $image->fit($width);
        $fname=str_replace("//","/",Helper::newPath("uploads/resources/$path/").$filename);
        $image->save($fname,100,"jpg");
        return $filename;
    }


    public  static  function createPhotoWithThumb(UploadedFile $file,$width=500){
        $filename=self::filenameHashes($file);
        self::createThumb($file,100,$filename,"thumbs");
        return self::createImage($file,$filename,$width,"photos");
    }

    public  static  function createDocument(UploadedFile $file,$source){
        if($file!==null){
            $name=sha1(self::hashes().md5(time())).".".$file->getExtension();
            $path=Helper::newPath("resources/").$source;
            $file->move($path,$name);
            return $name;
        }
        throw  new \Exception("upload of file failed");
    }

    public  static  function response($data,$status){
        return response()->json($data,$status);
    }

    public  static function  ip(){
        $ip="";
        if(!empty($_SERVER["HTTP_CLIENT_IP"])){
            $ip=$_SERVER["HTTP_CLIENT_IP"];
        }else if(!empty($_SERVER["HTTP_X_FORWARDED_FOR"])){
            $ip=$_SERVER["HTTP_X_FORWARDED_FOR"];
        }else{
            if(!empty($_SERVER["REMOTE_ADDR"]))
                $ip=$_SERVER["REMOTE_ADDR"];
            else $ip="masked";
        }
        return $ip;
    }

    public static function timepass($time_ago){
        $cur_time   = time();
        $time_elapsed   = $cur_time- intval($time_ago);
        $seconds    = $time_elapsed ;
        $minutes    = round($time_elapsed / 60 );
        $hours      = round($time_elapsed / 3600);
        $days       = round($time_elapsed / 86400 );
        $weeks      = round($time_elapsed / 604800);
        $months     = round($time_elapsed / 2600640 );
        $years      = round($time_elapsed / 31207680 );

        // Seconds
        if($seconds <= 60){
            if($seconds==1)
                return "1s ago";
            else
                return  $seconds."s ago";

        }
        //Minutes
        else if($minutes <=60){
            return $minutes."m ago";
        }
        //Hours
        else if($hours <=24){
            return $hours."h ago";
        }
        //Days
        else if($days <= 7){
            if($days==1)
                return "yesterday";else return $days."d ago";

        }
        //Weeks
        else if($weeks <= 4.3){
            if($weeks==1)
                return "a week ago";else return $weeks."w ago";
        }
        //Months
        else if($months <=12){
            if($months==1)
                return "a month ago"; else return $months."M ago";

        }
        //Years
        else{
            if($years==1)
                return "one year ago";else return $years."y ago";
        }

    }
    public static function timeDays($time_ago){
        $cur_time   = time();
        $time_elapsed   = $cur_time- intval($time_ago);
        $days       = round($time_elapsed / 86400 );
        if($days<=0)
            return  "0d";

        // Seconds
        return $days."d";
    }
    public static function isOneWeek($time_ago){
        $cur_time   = time();
        $time_elapsed   = $cur_time - floatval($time_ago);
        $week = round($time_elapsed /604800);
        if($week<=0)
            return  false;

        // Seconds
        return true;
    }
    public static function isday($time_ago,$days=2){
        $cur_time   = time();
        $time_elapsed   = $cur_time- floatval($time_ago);
        $day = round($time_elapsed /(86400*$days));
        return $day>=1;
    }

    public static function timefuture($time_future){
        $cur_time   = time();
        $time_elapsed   =floatval($time_future)- $cur_time;
        $seconds    = $time_elapsed ;
        $minutes    = round($time_elapsed / 60 );
        $hours      = round($time_elapsed / 3600);
        $days       = round($time_elapsed / 86400 );
        $weeks      = round($time_elapsed / 604800);
        $months     = round($time_elapsed / 2600640 );
        $years      = round($time_elapsed / 31207680 );

        // Seconds
        if($seconds <= 60){
            if($seconds==1)
                return "one seconds later";
            else
                return  "$seconds seconds later";

        }
        //Minutes
        else if($minutes <=60){
            if($minutes==1)
                return "in one minute";
            else
                return "in $minutes minutes ";
        }
        //Hours
        else if($hours <=24){
            if($hours==1)
                return "in one hour ";
            else
                return "in $hours hours";
        }
        //Days
        else if($days <= 7){
            if($days==1)
                return "tommorrow";
            else return "in $days days";

        }
        //Weeks
        else if($weeks <= 4.3){
            if($weeks==1)
                return "in one week ";else return "in $weeks weeks";
        }
        //Months
        else if($months <=12){
            if($months==1)
                return "in 30 days"; else return "in $months months";

        }
        //Years
        else{
            if($years==1)
                return "in one year";
            else return "in $years years ";
        }

    }









}