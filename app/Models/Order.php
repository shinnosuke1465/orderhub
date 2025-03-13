<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'product_id1',
        'num1',
        'product_id2',
        'num2',
        'product_id3',
        'num3',
        'orderday',
    ];
    public function customer ()
    {
        return $this->belongsTo(Customer::class);
    }
    public function product1()
    {
        return $this->belongsTo(Product::class, 'product_id1');
    }
    public function product2()
    {
        return $this->belongsTo(Product::class, 'product_id2');
    }
    public function product3()
    {
        return $this->belongsTo(Product::class, 'product_id3');
    }
}
