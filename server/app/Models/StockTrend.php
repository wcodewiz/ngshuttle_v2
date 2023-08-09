<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockTrend extends Model
{
    use HasFactory;
    public function product(){
        return $this->hasOne(Product::class,"id","product")->with("sub_category")->with("spec")
        ->with("vendor")->with("rating")->with("comment");
    }
}