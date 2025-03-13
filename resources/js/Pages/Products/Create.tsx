import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import SelectInput from '@/Components/SelectInput';

// 税率オプションの定義
const taxs = [
    { id: 10, name: '10%' },
    { id: 8, name: '8%' },
    { id: 0, name: '非課税' },
];
interface ProductFormData {
    name: string;
    code: string;
    price: number;
    tax: number | null;
}

export default function CreateProduct() {
    const { data, setData, post, processing, errors, reset } = useForm<ProductFormData>({
        name: '',
        code: '',
        price: 0,
        tax: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('products.store'), {
            onSuccess: () => reset('name', 'code', 'price', 'tax'),
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">CreateProduct</h2>}
        >
            <Head title="CreateProduct" />

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">商品登録</div>
                    </div>
                </div>

                <div className="m-3 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-2">

                        {/* 戻るリンク */}
                        <div className="mt-3 mb-3 ml-3 flex">
                            <Link
                                href={route('products.index')}
                                className="px-4 py-2 bg-indigo-500 text-white border rounded-md font-semibold text-xs"
                            >
                                <i className="fa-solid fa-backward"></i> 戻る
                            </Link>
                        </div>

                        <form onSubmit={submit} className='ml-3 mr-3'>
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="code" value="Code" />
                                <TextInput
                                    id="code"
                                    type="text"
                                    name="code"
                                    value={data.code}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) => setData('code', e.target.value)}
                                    required
                                />
                                <InputError message={errors.code} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="price" value="Price" />
                                <TextInput
                                    id="price"
                                    type="text"
                                    name="price"
                                    value={data.price}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) => setData('price', Number(e.target.value))}
                                    required
                                />
                                <InputError message={errors.price} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="tax" value="Tax" />
                                <SelectInput
                                    id="tax"
                                    options={taxs}
                                    name="tax"
                                    value={data.tax !== null ? data.tax : ""}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) => setData('tax', Number(e.target.value))}
                                    required
                                />
                                <InputError message={errors.tax} className="mt-2" />
                            </div>



                            <div className="mt-4 flex items-center justify-end">

                                <PrimaryButton className="ms-4" disabled={processing}>
                                    登録
                                </PrimaryButton>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
