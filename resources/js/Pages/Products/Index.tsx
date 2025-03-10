import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import Pagination from '@/Components/Pagination';

interface Product {
    id: number;
    name: string;
    code: string;
    price: number;
    tax: number;
}

interface ProductsProps {
    //products: Product[];
    products: {
         current_page: number;
         last_page: number;
         links: {
             url: string | null;
             label: string;
             active: boolean;
         }[];
         data: Product[];  // 商品情報を含む配列
    };
    search_str: string;  // サーバーから渡される search_str を受け取る
    successMessage?: string;
  }


export default function Products({ products, search_str,successMessage }: ProductsProps) {
    const [searchStr, setSearchStr] = useState<string>(search_str || '');
    const form = useForm<{ id: number; search_str: string }>({
        id: 0,
        search_str: searchStr,
    });

    const deleteProduct = (id: number, name: string) => {
        if (confirm(`Are you sure to delete ${name}?`)) {
            form.delete(route('products.destroy', id));
        }
    };

     const searchGo = () => {
        //form.get(route('products.index'), { search_str: searchStr });
        const params: Record<string, any> = {};
        if (searchStr) {
            params.search_str = searchStr; // searchStrが存在する場合のみ追加
        }
        form.get(route('products.index'), params); // パラメータを渡す
    };
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">商品一覧</div>
                    </div>
                </div>

                <div className="m-3 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-2">
                        <div className="mt-3 mb-3 ml-3 flex">
                            <Link className='px-4 py-2 bg-indigo-500 text-white border rounded-md font-semibold' href={route('products.create')}>
                                <i className='fa-solid fa-plus-circle'></i>商品登録
                            </Link>
                            <TextInput
                                id="search_str"
                                type="text"
                                className="block w-32 ml-3"
                                value={searchStr || ''}
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
                    <table className="table-auto border border-gray-400 w-10/12 m-3">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 w-12">ID</th>
                            <th className="px-4 py-2 w-48">商品</th>
                            <th className="px-4 py-2 w-28">コード</th>
                            <th className="px-4 py-2 w-28 text-center">価格</th>
                            <th className="px-4 py-2 w-28 text-center">税率</th>
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.data.map((product) => {
                            return (
                            <tr key={product.id}>
                            <td className="border border-gray-400 px-4 py-2 text-center">{product.id}</td>
                            <td className="border border-gray-400 px-4 py-2">{product.name}</td>
                            <td className="border border-gray-400 px-4 py-2 text-center">{product.code}</td>
                            <td className="border border-gray-400 px-4 py-2 text-right">{product.price}</td>
                            <td className="border border-gray-400 px-4 py-2 text-right">{product.tax}%</td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                            <Link
                                href={route('products.edit', product.id)}
                                className="px-4 py-2 bg-yellow-400 text-white border rounded-md text-xs"
                            >
                                <i className="fa-solid fa-edit"></i>
                            </Link>
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                            <DangerButton onClick={() => deleteProduct(product.id, product.name)}>
                            <i className="fa-solid fa-trash"></i>
                            </DangerButton>
                            </td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={products.current_page}
                        lastPage={products.last_page}
                        links={products.links}
                        searchStr={searchStr}
                    />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
