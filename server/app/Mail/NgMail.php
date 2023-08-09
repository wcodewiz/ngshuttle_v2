<?php

namespace App\Mail;
use App\Models\User;
use App\utils\ShopApp;
use Illuminate\Mail\Mailable;

class NgMail extends Mailable{
public User $user;
public string $host=env("FRONT_HOST");
public string $appName=ShopApp::appName();

}