<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'customer' => CustomerResource::make($this->customer),
            'product1' => ProductResource::make($this->product1),
            'num1' => $this->num1,
            'product2' => ProductResource::make($this->product2),
            'num2' => $this->num2,
            'product3' => ProductResource::make($this->product3),
            'num3' => $this->num3,
            'orderday' => $this->orderday,
        ];
    }
}
