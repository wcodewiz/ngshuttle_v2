<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;
    public function category(){
        return $this->hasOne(Category::class,"id","category");
    }
    public function product(){
        return $this->hasMany(Product::class,"subcategory","id")->with("vendor")->with("spec")->with("rating")
        ->with("stock")->with("comment");
    }
}
