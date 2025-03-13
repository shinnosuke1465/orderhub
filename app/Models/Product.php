<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'code',
        'price',
        'tax',
    ];
    //public function orders()
    //{
    //    return $this->hasMany(Order::class);
    //}
    public function Product1()
    {
        return $this->hasMany(Order::class, 'product_id1');
    }
    public function Product2()
    {
        return $this->hasMany(Order::class, 'product_id2');
    }
    public function Product3()
    {
        return $this->hasMany(Order::class, 'product_id3');
    }
}
