<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    public function order(){
        return $this->hasOne(Order::class,"purchase","id");
    }
    public function product(){
        return $this->hasOne(Product::class,"id","product")->with("vendor")->with("sub_category")
        ->with("spec")->with("rating")->with("stock");
    }

}