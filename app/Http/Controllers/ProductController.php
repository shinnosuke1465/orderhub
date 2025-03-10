<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\ProductRequest;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if(empty($request->input()['search_str'])){
            $search_str=null;
            //$products = Product::all();
            $products = Product::paginate(5);
        }else{
            $search_str=$request->input()['search_str'];
            //$products = Product::where('name','LIKE','%'.$search_str.'%')->get();
            $products = Product::where('name','LIKE','%'.$search_str.'%')->paginate(5);
            //return dd($search_str['search_str']);
        }
	    return Inertia::render('Products/Index',
        [
            'products' => $products,
            'search_str' => $search_str,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Products/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        //dd($request);
        $product = new Product($request->input());
        $product->save();
        return redirect()->route('products.index')->with('success_str', '登録完了しました');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit',['product' => $product]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->input());
        return redirect()->route('products.index')->with('success_str', '更新完了しました');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
