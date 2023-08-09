<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Rating;
use App\Models\StockTrend;
use App\Models\SubCategory;
use App\Models\Vendor;

class HomeController extends Controller
{

    public function search($searchKey){
        $toLookFor=[Category::class,SubCategory::class,Product::class
        ,Rating::class,StockTrend::class,Vendor::class];
        $tables=["category","subCateory","product","rating","trends","vendor"];
        $found=[];
        $searched=[["name","id"],["name","id"],["price","name","description","id","vendor","subcategory"]
        ,["new_rate","rate_result"],["views","order_category"],["name","location"]];
        $selections=[["name","id","icon"],["name","id","icon","category"],
        ["name","description","id","price","vendor","specs","subcategory","pictures"],["*"],["*"],
        ["name","location","photo","id"]];
        $relations=[[],["category","product"],["vendor","spec","sub_category","rating","stock"],
        ["product"],["product"],["product"]];
        $index=0;
        foreach($toLookFor as $otl){
            $query=$otl::select($selections[$index])->with($relations[$index]);
            foreach($searched[$index] as $search){
                if($search){
                $query->orWhere("$search", 'like', "%{$searchKey}%");
                }
            }
        $found[$tables[$index]]=$query->get()->all();
        $index+=1;
        }
        return response($found);

    }


    public function searchRandom($searchKey){
        $toLookFor=[Category::class,SubCategory::class,Product::class
        ,Rating::class,StockTrend::class,Vendor::class];
        $tables=["category","subCateory","product","rating","trends","vendor"];
        $found=[];
        $searched=[["name","id"],["name","id"],["price","name","description","id","vendor","subcategory"]
        ,["new_rate","rate_result"],["views","order_category"],["name","location"]];
        $selections=[["name","id","icon"],["name","id","icon","category"],
        ["name","description","id","price","vendor","specs","subcategory","pictures"],["*"],["*"],
        ["name","location","photo","id"]];
        $relations=[[],["category","product"],["vendor","spec","sub_category","rating","stock"],
        ["product"],["product"],["product"]];
        $index=0;
        foreach($toLookFor as $otl){
            $query=$otl::select($selections[$index])->with($relations[$index])->inRandomOrder();
            foreach($searched[$index] as $search){
                if($search){
                $query->orWhere("$search", 'like', "%{$searchKey}%");
                }
            }
        $found[$tables[$index]]=$query->get()->all();
        $index+=1;
        }
        return response($found);

    }

}