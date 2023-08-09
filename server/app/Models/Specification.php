<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specification extends Model
{
    use HasFactory;

    public function product(){
        return $this->hasOne(Product::class,"id","product")->with("vendor")->with("sub_category")
        ->with("rating")->with("stock")->with("comment");
    }
}