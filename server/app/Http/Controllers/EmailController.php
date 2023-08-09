<?php

namespace App\Http\Controllers;

use App\Mail\ForgetPasswordMail;
use App\Mail\LastSeenMail;
use App\Mail\LoginMail;
use App\Mail\PasswordChangedMail;
use App\Mail\VerifyEmailMail;
use App\Mail\WelcomeMail;
use App\Models\User;
use App\utils\ShopApp;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\HtmlString;

class EmailController extends Controller
{
    //

    public static function sendWelcomeMail(User $user){
        Mail::to($user->email)->send(new WelcomeMail($user));
        return true;
    }

    public static function sendPasswordChangedMail(User $user){
        Mail::to($user->email)->send(new PasswordChangedMail($user));
        return true;

    }

    public static function sendVerifyPasswordMail(User $user,$link){
        Mail::to($user->email)->send(new ForgetPasswordMail($user,$link));
        return true;

    }

    public static function sendVerifyEmailMail(User $user,$link){
        Mail::to($user->email)->send(new VerifyEmailMail($user,$link));
        return true;

    }

    public static function sendLoginMail(User $user){
        Mail::to($user->email)->send(new LoginMail($user));
        return true;
    }

    public static function sendGoodsAdvertMail(User $user,$product=[]){

    }

    public static function sendLastSeenMail(User $user){
        Mail::to($user->email)->send(new LastSeenMail($user));
        return true;

    }


}
