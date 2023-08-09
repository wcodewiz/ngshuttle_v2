<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Statistic extends Model
{
    use HasFactory;

    public function purchase(){
        return $this->hasOne(Purchase::class,"id","purchase")->with("product");
    }
    public function rating(){
        return $this->hasOne(Rating::class,"id","rating")->with("product");
    }

    public function stock(){
        return $this->hasOne(StockTrend::class,"id","stock_trend")->with("product");
    }

}