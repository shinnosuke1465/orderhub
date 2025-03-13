import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useMemo } from 'react';
import Modal from '@/Components/Modal'; // モーダル用のコンポーネント
import { useState } from 'react';
import { ChangeEvent } from 'react'; //検索フォームの初期化(検索履歴が残らないようにする)

import SelectInput from '@/Components/SelectInput';

// 税率オプションの定義
interface Product {
    id: number;
    name: string;
    code: string;
    price: number;
    tax: number;
}
interface Customer {
    id: number;
    name: string;
}
interface OrdersProps {
    products: Product[];
    customers: Customer[];
}

interface OrderFormData {
    id?: number; // 追加 OrderForｍDataにid追加
    customer_id: number | null;
    product_id1: number | null;
    product_id2: number | null;
    product_id3: number | null;
    num1: number | null;
    num2: number | null;
    num3: number | null;
}

export default function EditOrder({ order, products, customers }: OrdersProps & { order: OrderFormData }) {
    const { data, setData, patch, processing, errors, reset } = useForm<OrderFormData>({
        customer_id: order.customer_id || null,
        product_id1: order.product_id1 || null,
        product_id2: order.product_id2 || null,
        product_id3: order.product_id3 || null,
        num1: order.num1 || null,
        num2: order.num2 || null,
        num3: order.num3 || null,
    });

    // モーダル表示状態を管理するステート
    const [isModalOpen, setModalOpen] = useState(false);
    // モーダル内の検索用ステート
    const [searchTerm, setSearchTerm] = useState('');
    // 検索結果
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    // 選択中のプロダクトインデックス
    const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);

    // 商品の選択処理（computed に相当）
    const selectedProduct1 = useMemo(() => products.find(p => p.id === data.product_id1), [data.product_id1, products]);
    const selectedProduct2 = useMemo(() => products.find(p => p.id === data.product_id2), [data.product_id2, products]);
    const selectedProduct3 = useMemo(() => products.find(p => p.id === data.product_id3), [data.product_id3, products]);
    console.log(selectedProduct1)

    // 商品検索処理
    const searchProduct = (searchTerm: string) => {
        const results = products.filter(product => product.name.includes(searchTerm));
        // console.log(results);
        setSearchResults(results);
    };

    // 商品選択処理
    //selectedProductIndex(モーダルでクリックされた商品)が1つ目のselectボックスだった場合product_id1に商品idを格納
    const selectProduct = (product: Product) => {
        const productId = Number(product.id);
        if (selectedProductIndex === 1) setData('product_id1', productId);
        else if (selectedProductIndex === 2) setData('product_id2', productId);
        else if (selectedProductIndex === 3) setData('product_id3', productId);
        closeModal();
    };


    // モーダル開閉処理
    const openModal = (index: number) => {
        setModalOpen(true);  // モーダルを開く
        console.log(index);
        setSelectedProductIndex(index);  // 商品1, 2, 3のいずれかを示すインデックスをセット
    };
    const closeModal = () => {
        setSearchTerm(''); // 検索文字列を初期化
        setSearchResults([]); // 検索結果を初期化
        setModalOpen(false);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // product_id2 が未選択なら null を設定
        if (!data.product_id2) {
            data.product_id2 = null;
            data.num2 = null;
        }
        // product_id3 が未選択なら null を設定
        if (!data.product_id3) {
            data.product_id3 = null;
            data.num3 = null;
        }

        patch(route('orders.update', order.id), {
            onSuccess: () => reset('customer_id', 'product_id1', 'num1', 'product_id2', 'num2', 'product_id3', 'num3'),
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">EditOrder</h2>}
        >
            <Head title="EditOrder" />

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">オーダー更新</div>
                    </div>
                </div>

                <div className="m-3 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-2">

                        {/* 戻るリンク */}
                        <div className="mt-3 mb-3 ml-3 flex">
                            <Link
                                href={route('orders.index')}
                                className="px-4 py-2 bg-indigo-500 text-white border rounded-md font-semibold text-xs"
                            >
                                <i className="fa-solid fa-backward"></i> 戻る
                            </Link>
                        </div>

                        <form onSubmit={submit} className='ml-2 mr-2'>
                            <div className="mt-4">
                                <InputLabel htmlFor="customer_id" value="Customer" />
                                <SelectInput
                                    id="customer_id"
                                    options={customers}
                                    name="customer_id"
                                    value={data.customer_id || 0}
                                    className="mt-1 block w-80"
                                    autoComplete="customer_id"
                                    onChange={(e) => setData('customer_id', Number(e.target.value))}
                                />
                                <InputError message={errors.customer_id} className="mt-2" />
                            </div>

                            <div className="mt-4 flex">
                                <div>
                                    <InputLabel htmlFor="product_id1" value="商品1" />
                                    <SelectInput
                                        id="product_id1"
                                        options={products}
                                        className="mt-1 block w-80"
                                        value={data.product_id1 || 0}
                                        onChange={(e) => setData('product_id1', Number(e.target.value))}
                                    />
                                    <InputError message={errors.product_id1} className="mt-2" />
                                </div>
                                {selectedProduct1 && (
                                    <div className="flex ml-10">
                                        <div className="w-24">
                                            <InputLabel value="コード" />
                                            <div className="mt-3 font-medium text-xl">{selectedProduct1.code}</div>
                                        </div>
                                        <div className="w-24 ml-10">
                                            <InputLabel value="価格" />
                                            <div className="mt-3 font-medium text-xl">{selectedProduct1.price}円</div>
                                        </div>
                                        <div className="w-24 ml-10">
                                            <InputLabel value="税率" />
                                            <div className="mt-3 font-medium text-xl">{selectedProduct1.tax}%</div>
                                        </div>
                                        <div className="ml-10">
                                            <InputLabel htmlFor="num1" value="注文数" />
                                            <TextInput
                                                id="num1"
                                                type="number"
                                                className="mt-1 block w-36"
                                                value={data.num1 || 0}
                                                onChange={(e) => setData('num1', Number(e.target.value))}
                                            />
                                            <InputError message={errors.num1} className="mt-2" />
                                        </div>
                                    </div>
                                )}
                                {/* 商品が選択されていない時に検索モーダル開けるようにする */}
                                {!selectedProduct1 && (
                                    <div className="mt-7 ml-2">
                                        <PrimaryButton type="button" onClick={() => openModal(1)}>商品を検索</PrimaryButton>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 flex">
                                <div className="">
                                    <InputLabel htmlFor="product_id2" value="商品2" />
                                    <SelectInput
                                        id="product_id2"
                                        options={products}
                                        className="mt-1 block w-80"
                                        value={data.product_id2 || 0}
                                        onChange={(e) => setData('product_id2', Number(e.target.value))}
                                    />
                                    <InputError message={errors.product_id2} className="mt-2" />
                                </div>
                                {selectedProduct2 && (
                                    <div className="flex ml-10">
                                        <div className="w-24">
                                            <InputLabel value="コード" />
                                            <div className="mt-3 font-medium text-xl">{selectedProduct2.code}</div>
                                        </div>
                                        <div className="w-24 ml-10">
                                            <InputLabel value="価格" />
                                            <div className="mt-3 font-medium text-xl">{selectedProduct2.price}円</div>
                                        </div>
                                        <div className="w-24 ml-10">
                                            <InputLabel value="税率" />
                                            <div className="mt-3 font-medium text-xl">{selectedProduct2.tax}%</div>
                                        </div>
                                        <div className="ml-10">
                                            <InputLabel htmlFor="num2" value="注文数" />
                                            <TextInput
                                                id="num2"
                                                type="number"
                                                className="mt-1 block w-36"
                                                value={data.num2 || 0}
                                                onChange={(e) => setData('num2', Number(e.target.value))}
                                            />
                                            <InputError message={errors.num2} className="mt-2" />
                                        </div>
                                    </div>
                                )}
                                {!selectedProduct2 && (
                                    <div className="mt-7 ml-2">
                                        <PrimaryButton type="button" onClick={() => openModal(2)}>商品を検索</PrimaryButton>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 flex">
                                <div className="">
                                    <InputLabel htmlFor="product_id3" value="商品3" />
                                    <SelectInput
                                        id="product_id3"
                                        options={products}
                                        className="mt-1 block w-80"
                                        value={data.product_id3 || 0}
                                        onChange={(e) => setData('product_id3', Number(e.target.value))}
                                    />
                                    <InputError message={errors.product_id3} className="mt-2" />
                                </div>
                                {selectedProduct3 && (
                                    <div className="flex ml-10">
                                        <div className="w-24">
                                            <InputLabel value="コード" />
                                            <div className="mt-3 font-medium text-xl">{selectedProduct3.code}</div>
                                        </div>
                                        <div className="w-24 ml-10">
                                            <InputLabel value="価格" />
                                            <div className="mt-3 font-medium text-xl">{selectedProduct3.price}円</div>
                                        </div>
                                        <div className="w-24 ml-10">
                                            <InputLabel value="税率" />
                                            <div className="mt-3 font-medium text-xl">{selectedProduct3.tax}%</div>
                                        </div>
                                        <div className="ml-10">
                                            <InputLabel htmlFor="num3" value="注文数" />
                                            <TextInput
                                                id="num3"
                                                type="number"
                                                className="mt-1 block w-36"
                                                value={data.num3 || 0}
                                                onChange={(e) => setData('num3', Number(e.target.value))}
                                            />
                                            <InputError message={errors.num3} className="mt-2" />
                                        </div>
                                    </div>
                                )}
                                {!selectedProduct3 && (
                                    <div className="mt-7 ml-2">
                                        <PrimaryButton type="button" onClick={() => openModal(3)}>商品を検索</PrimaryButton>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="ms-4" disabled={processing}>
                                    登録
                                </PrimaryButton>
                            </div>
                        </form>

                        {/* モーダルウインドウ */}
                        {isModalOpen && (
                            <Modal show={isModalOpen} onClose={closeModal}>
                                <div className="p-6">
                                    <h2 className="text-lg font-medium text-gray-900">商品検索</h2>
                                    <p className="mt-1 text-sm text-gray-600">文字列から商品を検索できます</p>

                                    <div className="mt-6">
                                        <InputLabel htmlFor="search_product_name" value="検索" className="sr-only" />
                                        <TextInput
                                            id="search_product_name"
                                            value={searchTerm}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                setSearchTerm(e.target.value);
                                                searchProduct(e.target.value);
                                            }}
                                            type="text"
                                            className="mt-1 block w-3/4"
                                            placeholder="文字列を入力"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <ul>
                                            {searchTerm && searchResults.map(product => (
                                                <li
                                                    key={product.id}
                                                    onClick={() => selectProduct(product)}
                                                    className="cursor-pointer hover:bg-gray-200 p-2 grid grid-cols-4"
                                                >
                                                    <span>{product.name}</span>
                                                    <span>{product.code}</span>
                                                    <span>{product.price}円</span>
                                                    <span>{product.tax}%</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <PrimaryButton onClick={closeModal}>キャンセル</PrimaryButton>
                                    </div>
                                </div>
                            </Modal>
                        )}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
