<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    public function product(){
        return $this->hasMany(Product::class,"vendor","id")->with("spec")->with("sub_category")
        ->with("rating")->with("stock")->with("comment");
    }
    public function user(){
        return $this->hasOne(User::class,"id","owner")->with("profile");
    }

}