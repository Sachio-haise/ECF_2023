import Footer from '@/components/Layouts/Client/Footer'
import Header from '@/components/Layouts/Client/Header'
import SecondaryButton from '@/components/SecondaryButton'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import AppLayout from '@/components/Layouts/AppLayout'
import { GetServerSideProps } from 'next'
import { cartProps } from '@/type/type'
import axios from '@/lib/axios'
import { useData } from '@/hooks/data'
import { CartItem } from '@/components/CartItem'
import { checkout } from '@/components/Checkout'
import CheckoutForm from '@/components/CheckoutForm'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
const options = {
    // passing the client secret obtained from the server
    clientSecret:
        'sk_test_51KwUJtGvJymOjyjLHJZIcOKUdWITkMIfumjqgDe6hFJK9SUzX3AyxJoulL88eudWTRWKtzcfVyuUUa1PyqvmyHkz00ftdAuLEH',
}

interface CartProps {
    carts: cartProps[]
}

const index = () => {
    const { carts, mutate } = useData()
    const [clientSecret, setClientSecret] = useState('')
    const { user } = useAuth({ middleware: 'auth' })
    console.log(carts)
    const [subtotal, setSubtotal] = useState<number>(0)

    const stripePromise = loadStripe(
        'pk_test_51KwUJtGvJymOjyjL7ziIRoyhMFZ8afQemcm2yRqT44mJjMoIhvAaYQUnBbI2sZKjvx2rlxFVd4GlixNwzWRDO8n800pVjtLZc0',
    )

    const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret,
    }

    useEffect(() => {
        const calculateSubtotal = () => {
            if (carts) {
                const newSubtotal = carts.reduce(
                    (total, cart) =>
                        total +
                        Number(cart.quantity) * Number(cart.product_id.price),
                    0,
                )
                setSubtotal(newSubtotal)
                console.log(subtotal)
            }
        }

        fetchClientSecret()
        calculateSubtotal()
    }, [carts])

    const fetchClientSecret = async () => {
        const grandTotol = subtotal
        console.log(grandTotol)

        const formData = new FormData()
        // formData.append('amount',grandTotol.toString());
        formData.append('customer_id', String(user?.id))
        formData.append('description', String('Ecommerce Payment'))
        try {
            const response = await axios.post(`/api/order/pay`, formData)
            setClientSecret(response.data.clientSecret)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Profile
                </h2>
            }>
            <Head>
                <title>Cart</title>

            </Head>
            <div className="my-10 mx-auto container">
                <Link
                    href={`/order-history`}
                    className=" text-darkBlue font-bold w-full decoration-darkBlue underline">
                    View Order History
                </Link>
                <p className="text-2xl text-darkBlue text-center font-bold ">
                    Your Cart [ {carts?.length} Items ]
                </p>
                <table className="mx-auto mt-8  w-full">
                    <thead className=" ">
                        <tr>
                            <th className="border-b w-[10.6%] border-gray-300 pb-3 text-left min-w-[100px] max-w-[150px]">
                                Item
                            </th>

                            <th className="border-b w-[22.6%] border-gray-300 pb-3 min-w-[150px] max-w-[200px]"></th>
                            <th className="border-b w-[16.6%] border-gray-300 pb-3 text-left  min-w-[50px] max-w-[80px]">
                                Size
                            </th>
                            <th className="border-b w-[16.6%] border-gray-300 pb-3 text-left min-w-[50px] max-w-[80px]">
                                Price
                            </th>
                            <th className="border-b w-[16.6%] border-gray-300 pb-3 text-left min-w-[100px] max-w-[120px]">
                                Quantity
                            </th>
                            <th className="border-b w-[16.6%] border-gray-300 pb-3 text-right">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts?.map(cart => (
                            <CartItem
                                cart={cart}
                                subtotal={subtotal}
                                setSubtotal={setSubtotal}
                            />
                        ))}
                    </tbody>
                </table>
                <div className="grid grid-cols-2 w-full mt-4">
                    <div className="bg-gray-100 p-5 rounded-lg mt-8">
                        {stripePromise && clientSecret && (
                            <Elements stripe={stripePromise} options={options}>
                                <CheckoutForm carts={carts} />
                            </Elements>
                        )}
                    </div>
                    <div>
                        <table className="ml-auto w-3/6 mt-4">
                            <tbody>
                                <tr>
                                    <td
                                        colSpan={2}
                                        className=" text-center font-bold text-xl text-darkBlue border-b border-gray-300 pb-2">
                                        Order Summary
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold  border-b border-gray-300 py-2">
                                        Subtotal :
                                    </td>
                                    <td className="text-sm  border-b border-gray-300 py-2 text-gray-400 font-semibold">
                                        <p>$ {subtotal}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold  border-b border-gray-300 py-2">
                                        Sales Tax ( 10% ) :
                                    </td>
                                    <td className="text-sm  border-b border-gray-300 py-2 text-gray-400 font-semibold">
                                        <p>$ {Math.ceil(subtotal * 0.1)}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold  py-2">
                                        Grand total :
                                    </td>
                                    <td className="text-sm  text-gray-400 font-semibold">
                                        <p>
                                            ${' '}
                                            {subtotal +
                                                Math.ceil(subtotal * 0.1)}
                                        </p>
                                    </td>
                                </tr>
                                {/* <tr>
                                <td colSpan={2}>
                                    <SecondaryButton>
                                        Process to checkout
                                    </SecondaryButton>
                                </td>
                            </tr>*/}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default index

export const getServerSideProps: GetServerSideProps<any> = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    let carts: cartProps[] = []

    try {
        const { data } = await axios.get(`/api/carts`)
        carts = data.data
        console.log(data)
    } catch (e) {
        console.log(e)
    }
    console.log(carts)

    return { props: { carts } }
}
