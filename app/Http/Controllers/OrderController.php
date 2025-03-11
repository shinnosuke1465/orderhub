<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use Inertia\Inertia;
use App\Http\Resources\OrderResource;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //$orders = OrderResource::collection(Order::paginate(5));
        if(empty($request->input()['search_str'])){
            $search_str=null;
            $orders = OrderResource::collection(
                Order::orderBy('id', 'desc')
                ->paginate(5)
            );
        }else{
            $search_str=$request->input()['search_str'];
            $orders = Order::whereHas('customer', function ($query) use ($search_str) {
                $query->where('name', 'LIKE', '%' . $search_str . '%');
            })
            ->orderBy('id', 'desc')
            ->paginate(5);

            $orders = OrderResource::collection($orders);
        }

        return Inertia::render('Orders/Index',[
            'orders' => $orders,
            'search_str' => $search_str,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
