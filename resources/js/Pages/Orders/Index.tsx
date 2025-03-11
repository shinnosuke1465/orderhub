import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

import DangerButton from '@/Components/DangerButton';
import { useForm } from '@inertiajs/react';

import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import Pagination from '@/Components/Pagination2';


interface Order {
    id: number;
    customer: { id: number; name: string; };
    product1: { id: number; name: string; code: string; price: number; tax: number; };
    num1: number;
    product2: { id: number; name: string; code: string; price: number; tax: number; };
    num2: number;
    product3: { id: number; name: string; code: string; price: number; tax: number; };
    num3: number;
    orderday: string;
}
interface OrdersProps {
    orders: {
        meta: {
            current_page: number;
            last_page: number;
            links: {
                url: string | null;
                label: string;
                active: boolean;
            }[];
        };
        data: Order[];
    };
    search_str: string;
    successMessage?: string;
}

export default function Orders({ orders, search_str, successMessage }: OrdersProps) {
    console.log(orders)

    const [searchStr, setSearchStr] = useState<string>(search_str || '');

    const form = useForm<{ id: number; search_str: string }>({
        id: 0,
        search_str: searchStr,
    });

    const deleteOrder = (id: number, name: string) => {
        if (confirm(`Are you sure to delete ${name}?`)) {
            form.delete(route('orders.destroy', id));
        }
    };

    const searchGo = () => {
        //form.get(route('products.index'), { search_str: searchStr });_str: searchStr });
        const params: Record<string, any> = {};
        if (searchStr) {
            params.search_str = searchStr; // searchStrが存在する場合のみ追加
        }
        form.get(route('orders.index'), params); // パラメータを渡す
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders</h2>}
        >
            <Head title="Orders" />

            <div className="py-3">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">オーダー一覧</div>
                    </div>
                </div>

                <div className="m-3 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-2">

                        {/* 商品登録リンク */}
                        <div className="mt-3 mb-3 ml-3 flex">
                            <Link
                                href={route('orders.create')}
                                className="px-4 py-2 bg-indigo-500 text-white border rounded-md font-semibold text-xs"
                            >
                                <i className="fa-solid fa-plus-circle"></i> 注文登録
                            </Link>

                            <TextInput
                                id="search_str"
                                type="text"
                                className="block w-32 ml-3"
                                value={searchStr}
                                onChange={(e) => {
                                    setSearchStr(e.target.value);
                                    form.setData('search_str', e.target.value);
                                }}
                                autoComplete="search_str"
                                onBlur={searchGo}
                            />
                        </div>
                        {/* 成功メッセージの表示 */}
                        {successMessage && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded m-3">
                                {successMessage}
                            </div>
                        )}
                        <table className="table-auto border border-gray-400 w-100 m-3">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2"></th>
                                    <th className="px-4 py-2 text-xs">受注日</th>
                                    <th className="px-4 py-2 text-xs">顧客</th>
                                    <th className="px-4 py-2 text-xs">商品1</th>
                                    <th className="px-4 py-2 text-xs">単価</th>
                                    <th className="px-4 py-2 text-xs">税率</th>
                                    <th className="px-1 py-2 text-xs">注文数</th>
                                    <th className="px-4 py-2 text-xs">商品2</th>
                                    <th className="px-4 py-2 text-xs">単価</th>
                                    <th className="px-4 py-2 text-xs">税率</th>
                                    <th className="px-1 py-2 text-xs">注文数</th>
                                    <th className="px-4 py-2 text-xs">商品3</th>
                                    <th className="px-4 py-2 text-xs">単価</th>
                                    <th className="px-4 py-2 text-xs">税率</th>
                                    <th className="px-1 py-2 text-xs">注文数</th>
                                    <th className="px-4 py-2"></th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.data.map((order) => {
                                    return (
                                        <tr key={order.id}>
                                            <td className="border border-gray-400 px-4 py-2 text-center">{order.id}</td>
                                            <td className="border border-gray-400 px-2 py-2 text-center text-xs">{order.orderday}</td>
                                            <td className="border border-gray-400 px-4 py-2">{order.customer.name}</td>
                                            <td className="border border-gray-400 px-2 py-2 text-center">{order.product1.name}</td>
                                            <td className="border border-gray-400 px-2 py-2 text-center">{order.product1.price}</td>
                                            <td className="border border-gray-400 px-2 py-2 text-center">{order.product1.tax}%</td>
                                            <td className="border border-gray-400 px-2 py-2 text-center">{order.num1}</td>
                                            <td className="border border-gray-400 px-2 py-2 text-center">{order.product2?.name}</td>
                                            <td className="border border-gray-400 px-2 py-2 text-center">{order.product2?.price}</td>
                                            <td className="border border-gray-400 px-2 py-2 text-center">{order.product2 ? `${order.product2.tax}%` : ''}</td>
                                            <td className="border border-gray-400 px-2 py-2 text-center">{order.num2}</td>
                                            <td className="border border-gray-400 px-2 py-2 text-center">{order.product3?.name}</td>
                                            <td className="border border-gray-400 px-2 py-2 text-center">{order.product3?.price}</td>
                                            <td className="border border-gray-400 px-2 py-2 text-center">{order.product3 ? `${order.product3.tax}%` : ''}</td>
                                            <td className="border border-gray-400 px-2 py-2 text-center">{order.num3}</td>
                                            <td className="border border-gray-400 px-4 py-2 text-center">
                                                <Link
                                                    href={route('orders.edit', order.id)}
                                                    className="px-4 py-2 bg-yellow-400 text-white border rounded-md text-xs"
                                                >
                                                    <i className="fa-solid fa-edit"></i>
                                                </Link>
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2 text-center">
                                                <DangerButton onClick={() => deleteOrder(order.id, order.customer.name)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </DangerButton>
                                            </td>

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Pagination
                            currentPage={orders.meta.current_page}
                            lastPage={orders.meta.last_page}
                            links={orders.meta.links}
                            searchStr={searchStr}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
