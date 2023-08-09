<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function vendor(){
     return   $this->hasOne(Vendor::class,"id","vendor");
    }
    public function sub_category(){
        return $this->hasOne(SubCategory::class,"id","subCategory")->with("category");
    }
    public function spec(){
        return $this->hasOne(Specification::class,"id","specs");
    }
    public function rating(){
        return $this->hasOne(Rating::class,"product","id");
    }
    public function stock(){
        return $this->hasOne(StockTrend::class,"product","id");
    }
    public function comment(){
        return $this->hasMany(ReviewComment::class,"product","id")->with("user");
    }
}