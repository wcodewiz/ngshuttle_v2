<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Rating;
use App\utils\DataAnalaysis;
use App\utils\Helper;
use App\utils\ShopApp;
use Illuminate\Http\Request;

class RateResult{
    public $rates=[];
    public $dates=[];
    public $user=[];
    public $current=0;
}

class RatingController extends Controller
{



    public function rate($pid,$rateValue){
        $rateValue=intval($rateValue);
        $product=Product::where("id","=",$pid)->first();
        $user=auth()->id();
        if(!$product){
            return response(["message"=>"Not found"]);
        }
        $rating=Rating::where("product","=",$pid)->first();
        if(!$rating){
            $rate=new RateResult();
            $rate->rates=[$rateValue];
            $rate->current=$rateValue/1.34;
            $transport=ShopApp::a_base(json_encode($rate));
            $rate->dates=[date("D-M-Y")];
            $rate->user=[$user];

            $rating=new Rating();
            $rating->product=$pid;
            $rating->new_rate=$transport;
            $rating->old_rate="";
            $rating->rate_result=$rate->current;
            $rating->save();
            return response(["message","you rated this product ".Helper::nouns($rateValue,"star")]);
        }
        else{
            $old=$rating->new_rate;
            $transport=ShopApp::d_base($rating->new_rate);
            $rate=json_decode($transport);

            if(!in_array($user,$rate->user)){

            array_push($rate->rates,$rateValue);
            array_push($rate->dates,date("D-M-Y"));
            array_push($rate->user,$user);

            $data=new DataAnalaysis($rate->rates);
            $rate->current=$data->mode();
            if(count($rate->rates)<5){
                $rate->current=$rate->current/1.12;
            }
            $transport=ShopApp::a_base(json_encode($rate));
            $rating->product=$pid;
            $rating->new_rate=$transport;
            $rating->old_rate=$old;
            $rating->rate_result=$rate->current;
            $rating->save();
            return response(["message","you rated this product ".Helper::nouns($rateValue,"star")]);
            }
            else response(["You already rated this product"]);
        }

    }

}
