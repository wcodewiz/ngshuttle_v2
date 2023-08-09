<?php

namespace App\Http\Controllers;

use App\Models\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PasswordResetController extends Controller
{

    public static function createReset($id,$hash,$time){
        $pas=new PasswordReset();
        $pas->user=$id;
        $pas->verify_hash=Hash::make($hash);
        $pas->time=$time;
        $pas->save();
        return $pas;
    }

}