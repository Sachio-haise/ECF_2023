import AppLayout from '@/components/Layouts/AppLayout'
import SecondaryButton from '@/components/SecondaryButton'
import { useData } from '@/hooks/data'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

function index() {
    const { orderRecord } = useData()
    const router = useRouter()
    console.log(orderRecord)

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Purchase Record
                </h2>
            }>
            <Head>
                <title>Product List</title>

            </Head>
            <div className="mx-auto my-8 container">
                <table className="w-full mt-4">
                    <thead>
                        <tr>
                            <td
                                colSpan={8}
                                className=" text-center font-bold text-xl text-darkBlue border-b border-gray-300 pb-2">
                                Purchase History
                            </td>
                        </tr>
                        <tr>
                            <th className="border-b border-gray-300 py-2">
                                Order Id
                            </th>
                            <th className="border-b border-gray-300 py-2">
                                Date
                            </th>
                            <th className="border-b border-gray-300 py-2">
                                Transaction Id
                            </th>
                            <th className="border-b border-gray-300 py-2">
                                Currency
                            </th>
                            <th className="border-b border-gray-300 py-2">
                                Item
                            </th>
                            <th className="border-b border-gray-300 py-2">
                                Quantity
                            </th>
                            <th className="border-b border-gray-300 py-2">
                                Price
                            </th>
                            <th className="border-b border-gray-300 py-2">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderRecord?.map(order => (
                            <tr>
                                <td className="text-center border-b border-gray-300 py-2">
                                    {order.id}.
                                </td>
                                <td className="text-center border-b border-gray-300 py-2">
                                    {order.created_at}
                                </td>
                                <td className="text-center border-b border-gray-300 py-2">
                                    {order.transaction_id}
                                </td>
                                <td className="text-center border-b border-gray-300 py-2">
                                    {order.currency}
                                </td>
                                <td className="text-center text-darkBlue font-bold border-b border-gray-300 py-2">
                                    <Link
                                        href={
                                            '/product/' + order.product_id.id
                                        }>
                                        {order.product_id.title}
                                    </Link>
                                </td>
                                <td className="text-center border-b border-gray-300 py-2">
                                    {order.quantity}
                                </td>
                                <td className="text-center border-b border-gray-300 py-2">
                                    {order.product_id.price}
                                </td>
                                <td className="text-center border-b border-gray-300 py-2">
                                    {Number(order.product_id.price) *
                                        Number(order.quantity)}
                                </td>
                            </tr>
                        ))}

                        <tr>
                            <td colSpan={6} className="text-center pt-6">
                                <SecondaryButton
                                    onClick={() => router.push('/cart')}>
                                    Go Back
                                </SecondaryButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppLayout>
    )
}

export default index
