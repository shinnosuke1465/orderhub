//import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

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

interface OrderData {
  id: number;
  orderday: string;
  customer: Customer;
  product1: Product;
  num1: number;
  product2: Product;
  num2: number;
  product3: Product;
  num3: number;
}

interface OrderProps {
  order: {
    data: OrderData;
  };
  total: number;
  normal_tax_total: number;
  reduced_tax_total: number;
  normal_tax: number;
  reduced_tax: number;
}

export default function OrderDetail(props: OrderProps) {
    const { data, setData, post } = useForm({
      total: props.total,
      normal_tax_total: props.normal_tax_total,
      reduced_tax_total: props.reduced_tax_total,
      normal_tax: props.normal_tax,
      reduced_tax: props.reduced_tax,
    });
    console.log(props);

  const handleSubmit = () => {
    const orderId = props.order.data.id;
    window.open(route('orders.pdf',orderId), '_blank'); // 新しいタブでPDF生成リクエストを送信
  };

  return (
    <AuthenticatedLayout
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">OrderDetail</h2>}
    >
        <Head title="OrderDetail" />

        <div className="py-3">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">オーダー詳細</div>
                </div>
            </div>

            <div className="mt-3 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
                    <div className="mb-3 flex">
                    <Link
                        href="/orders"
                        className="px-4 py-2 bg-indigo-500 text-white border rounded-md font-semibold text-xs"
                    >
                        <i className="fa-solid fa-backward"></i> 戻る
                    </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="w-3/4">
                    <div className="flex">
                        <div className="w-32">
                        <InputLabel htmlFor="order_id" value="ID" />
                        <div className="ml-2 font-semibold text-xl">
                            {props.order.data.id}
                        </div>
                        </div>
                        <div className="w-72">
                        <InputLabel htmlFor="order_id" value="注文日" />
                        <div className="ml-2 font-semibold text-xl">
                            {props.order.data.orderday}
                        </div>
                        </div>
                        <div>
                        <InputLabel htmlFor="customer_id" value="客先" />
                        <div className="ml-2 font-semibold text-xl">
                            {props.order.data.customer.name}
                        </div>
                        </div>
                    </div>

                    {/* 小計 */}
                    <div className="mt-4 flex">
                        <table className="table-auto border border-gray-400 w-10/12">
                        <thead>
                            <tr className="bg-blue-100">
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2 text-xs">お買い上げ額合計（円）</th>
                            <th className="px-4 py-2 text-xs">消費税額合計（円）</th>
                            <th className="px-4 py-2 text-xs">ご請求金額（円）</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white">
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                通常税率（10%）
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.normal_tax_total}円
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.normal_tax}円
                            </td>
                            <td
                                className="border border-gray-400 px-4 py-2 text-center"
                                rowSpan={2}
                            >
                                {props.total}円
                            </td>
                            </tr>
                            <tr className="bg-white">
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                軽減税率（ 8%）
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.reduced_tax_total}円
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.reduced_tax}円
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>

                    {/* 明細 */}
                    <div className="mt-4">
                        <InputLabel htmlFor="" value="明細" />
                    </div>
                    <div className="mt-4 flex">
                        <table className="table-auto border border-gray-400 w-10/12">
                        <thead>
                            <tr className="bg-blue-100">
                            <th className="px-4 py-2">商品</th>
                            <th className="px-4 py-2 text-xs">コード</th>
                            <th className="px-4 py-2 text-xs">価格</th>
                            <th className="px-4 py-2 text-xs">税率</th>
                            <th className="px-4 py-2 text-xs">注文数</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white">
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.order.data.product1.name}
                                {props.order.data.product1.tax === 8 && '＊'}
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.order.data.product1.code}
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.order.data.product1.price}円
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.order.data.product1.tax}％
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.order.data.num1}
                            </td>
                            </tr>
                            {props.order.data.product2?.id && (
                            <tr className="bg-white">
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.order.data.product2.name}
                                {props.order.data.product2.tax === 8 && '＊'}
                                </td>
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.order.data.product2.code}
                                </td>
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.order.data.product2.price}円
                                </td>
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.order.data.product2.tax}％
                                </td>
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.order.data.num2}
                                </td>
                            </tr>
                            )}
                            {props.order.data.product3?.id && (
                            <tr className="bg-white">
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.order.data.product3.name}
                                {props.order.data.product3.tax === 8 && '＊'}
                                </td>
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.order.data.product3.code}
                                </td>
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.order.data.product3.price}円
                                </td>
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.order.data.product3.tax}％
                                </td>
                                <td className="border border-gray-400 px-4 py-2 text-center">
                                {props.order.data.num3}
                                </td>
                            </tr>
                            )}
                        </tbody>
                        </table>
                    </div>
                    <div>＊軽減税率対象</div>

                    <div className="flex items-center mt-8 mb-8">
                        <PrimaryButton onClick={handleSubmit}>請求書発行</PrimaryButton>
                    </div>
                    </form>
                </div>
            </div>

        </div>
      </AuthenticatedLayout>
  );
};
