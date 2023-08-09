<?php


namespace App\utils;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;


class Pictures{
   public $fullImages=[];
   public $zoomImages=[];
   public $thumbImages=[];
}

class  ControlApp extends BaseController{

    use AuthorizesRequests, ValidatesRequests;


    public function __construct(
        public  $object,
        protected $with,
        protected $withFront,
        protected $withMerchant,
        protected $searchKey

    ){}


    private function with(){
        if(count($this->with)>0){
            $offset=0;
            $this->object=$this->object::with($this->with[$offset]);
            if(count($this->with)>1){
    foreach($this->with as $w){
            if($offset<1){
                $offset+=1;
                continue;
            }
            $this->object=$this->object->with($w);
            $offset+=1;
        }
    }
        return $this->object;
    }
    return $this->object::select(["*"]);
    }
    private function withFront(){
        if(count($this->withFront)>0){
            $offset=0;
            $this->object=$this->object::with($this->withFront[$offset]);
            if(count($this->withFront)>1){
    foreach($this->withFront as $w){
            if($offset<1){
                $offset+=1;
                continue;
            }
            $this->object=$this->object->with($w);
            $offset+=1;
        }
    }
        return $this->object;
    }
    return $this->object::select(["*"]);
    }

    private function withMerchant(){
        if(count($this->withMerchant)>0){
            $offset=0;
            $this->object=$this->object::with($this->withMerchant[$offset]);
            if(count($this->withMerchant)>1){
    foreach($this->withMerchant as $w){
            if($offset<1){
                $offset+=1;
                continue;
            }
            $this->object=$this->object->with($w);
            $offset+=1;
        }
    }
        return $this->object;
    }
    return $this->object::select(["*"]);

}
    

    protected function find($searchKey){
        $object=$this->with()->where($this->searchKey[0],"like","%{$searchKey}%");
        if(strrpos($searchKey,"+")!==false){
            $keys=explode("+",$searchKey);
            foreach($keys as $mkey){
                if($mkey!==""){
                    foreach($this->searchKey as $search){
                        $object->orWhere("$search", 'like', "%{$mkey}%");
                    }

                }
            }
        }else{
        foreach($this->searchKey as $search){
            $object->orWhere("$search", 'like', "%{$searchKey}%");
        }

    }
        return response($object->get());
    }

    public function get(){
    return response($this->with()->get());
    }
    public function getRandom(){
        return response($this->with()->inRandomOrder()->get());
    }

    public function getFront(){
        return response($this->withFront()->get());
    }
    public function getMerchant(){
        return response($this->withMerchant()->get());
    }

    public function getFrontRandom(){
        return response($this->withFront()->inRandomOrder()->get());
    }
    public function getMerchantRandom(){
        return response($this->withMerchant()->inRandomOrder()->get());
    }

    protected function validateAndUpload(Request $request,$filename,$num,
    $hasThumb=true,$hasPhoto=true,$hasZoom=true,
    $photoSize=300,$zoomSize=800,$thumbSize=100
    ,$extentions="png,jpg,jpeg,gif,webp"){
        $pictures=new Pictures();

        for($i=0;$i<$num;$i++){
            $file="$filename-$i";
            if($request->hasFile($file)){
            $valid=Validator::make($request->all(),[
                "$filename-$i"=>"required|mimes:$extentions"
            ]);
            if(!$valid->fails()){
            if($hasZoom){
                $zoomImage=ShopApp::createImage($request->file($file),ShopApp::filenameHashes($request->file($file))
            ,$zoomSize,"hd/images/zoom");
            array_push($pictures->zoomImages,ShopApp::resZoom($zoomImage));

        }
            if($hasThumb&&$hasPhoto){
                $photo=ShopApp::createPhotoWithThumb($request->file($file),$photoSize);
                array_push($pictures->fullImages,ShopApp::resPhotos($photo));
                array_push($pictures->thumbImages,ShopApp::resThumbs($photo));

            }

            if($hasThumb&&!$hasPhoto){
                $photo=ShopApp::createThumb($request->file($file),$thumbSize);
                array_push($pictures->thumbImages,ShopApp::resThumbs($photo));

            }

                if($hasPhoto&&!$hasThumb){
                    $photo=ShopApp::createImage($request->file($file),ShopApp::filenameHashes($request->file($file))
                    ,$photoSize,"normal/images");
                array_push($pictures->fullImages,ShopApp::resPhotos($photo));
                }


            }


        }

        }
        return json_encode($pictures);
    }


    public function fetch($id){
        return response($this->with()->where("id","=",$id)->first());
        }
        public function fetchFront($id){
            return response($this->withFront()->where("id","=",$id)->first());
            }
            public function fetchMerchant($id){
                return response($this->withMerchant()->where("id","=",$id)->first());
                }

    public function addRequest(Request $request,$rules,$callback,$succesMessage){
        $valid=Validator::make($request->all(),$rules);
        if($valid->fails()){
            return response($valid->messages()->all(),403);
        }
        if($callback){
            call_user_func($callback);
        }
    return response(["message"=>$succesMessage]);
    }

    protected function  UpdateDeletePhoto($clazz,$photo){
        $pictures=json_decode($clazz->{$photo});
        foreach(["fullImages","thumbImages","zoomImages"] as $name){
            if($pictures!==null){
        for($i=0;$i<count($pictures->{$name});$i++){
            $file=$pictures->${$name}[$i];
            if(file_exists(public_path($file))){
                unlink(public_path($file));
            }
        }
    }
}
    }

    protected function updateRequest(Request $request,$id,$keys,$callback
    ,$success="save changes",$notFoundError="Not found"){
        $object=$this->object::where("id","=",$id)->first();
        if(!$object){
            return response(["message"=>$notFoundError],403);
        }
        foreach($keys as  $key){
            if($request->has($key)){
                $valid=Validator::make($request->all(),[
                    "$key"=>"required"
                ]); if($valid->fails()){
                    continue;
                }
                $object->{$key}=$request->{$key};
            }
        }
        if($callback){
        $object=call_user_func($callback,$object);
        }
        $object->save();
        return response(["message"=>$success]);

    }

    public function delete($id,$deleteKey="visible",$success="deleted",$notFoundError="Object not found"){
        $object=$this->object::where("id","=",$id)->first();
        if(!$object){
            return response(["message"=>$notFoundError],403);
        }
        $object->{$deleteKey}=false;
        $object->save();
        return response(["message"=>$success]);
    }
    public function recover($id,$deleteKey="visible",$success="recovered",$notFoundError="Object not found"){
        $object=$this->object::where("id","=",$id)->first();
        if(!$object){
            return response(["message"=>$notFoundError],403);
        }
        $object->{$deleteKey}=true;
        $object->save();
        return response(["message"=>$success]);
    }
    public function remove($id,$success="deleted",$notFoundError="Object not found"){
        $object=$this->object::where("id","=",$id)->first();
        if(!$object){
            return response(["message"=>$notFoundError],403);
        }
        $object->delete();
        return response(["message"=>$success]);
    }



}