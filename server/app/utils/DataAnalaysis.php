<?php

namespace App\utils;


class DataAnalaysis{

    private $size;

   public function __construct(
    public $dataFrame
   ){
    $this->size=count($dataFrame);
   }

    public function mean($arr=[]){
        if(empty($arr)){
            $arr=$this->dataFrame;
        }
        $sum=0;
        for($i=0;$i<count($arr);$i++){
            $sum+=$arr[$i];
        }
        return $sum/$this->size;
    }
    public function median(){
    $isEven=$this->size%2==0;
    if($isEven){
        $list1=array_slice($this->dataFrame,0,$this->size/2);
        $list2=array_slice($this->dataFrame,$this->size/2);

        return ($list1[count($list1)-1]+$list2[0])/2;
    }
    return $this->dataFrame[(($this->size-1)/2)+1];

    }
    public function mode($arr=[]){
        if(empty($arr)){
            $arr=$this->dataFrame;
        }

        sort($arr);
        $obj=[];
        for($i=0;$i<count($arr);$i++){
            $occurs=0;
            for($j=0;$j<count($arr);$j++){
                if($arr[$j]===$arr[$i]){
                    $occurs++;
            }
        }
        $obj[$arr[$i]]=$occurs;
        $i+=$occurs;
        }
        $max=0; $current=0;
        foreach($obj as $data=>$value){
            if($value>$max){
                $max=$value;
                $current=$data;
            }
        }

        return $current;
    }




}