import { cartProps } from '@/type/type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Counter } from './Counter'

interface CartItemProps {
    cart: cartProps

    subtotal: number
    setSubtotal: React.Dispatch<React.SetStateAction<number>>
}

export const CartItem = ({ cart, setSubtotal, subtotal }: CartItemProps) => {
    const [qty, setQty] = useState<number>(0)

    useEffect(() => {}, [])
    return (
        <tr className="my-4" key={cart.id}>
            <td className="flex justify-left border-b border-gray-300 py-3">
                <Link href={`/product/${cart.product_id.id}`}>
                    <Image
                        src={cart.product_id.image}
                        className="min-w-[100px] min-h-[100px]"
                        width={100}
                        height={100}
                        alt="box-1.png"
                    />
                </Link>
            </td>

            <td className="border-b border-gray-300 py-3">
                <div className="flex justify-left">
                    <div>
                        <Link
                            href={`/product/${cart.product_id.id}`}
                            className=" font-bold hover:text-darkBlue text-semiBlue text-2xl">
                            {cart.product_id.title}
                        </Link>
                        <br />
                        <Link
                            href={`/product/${cart.product_id.id}`}
                            className=" font-bold text-lg">
                            [{cart.product_id.subtitle}]
                        </Link>
                    </div>
                </div>
            </td>
            <td className="border-b border-gray-300 font-bold py-3">
                {cart.size}
            </td>
            <td className="border-b border-gray-300 py-3">
                <p className="text-lg text-gray-700 font-bold text-left">
                    $ {cart.product_id.price}
                </p>
            </td>
            <td className="border-b border-gray-300 py-3">
                <Counter
                    key={cart.id}
                    subtotal={subtotal}
                    setSubtotal={setSubtotal}
                    qty={qty}
                    setQty={setQty}
                    price={cart.product_id.price}
                    quantity={cart.quantity}
                    productQty={cart.sizeQty}
                />
            </td>
            <td className="border-b border-gray-300 py-3">
                <p className="text-2xl text-darkBlue font-bold text-right">
                    $ {qty * Number(cart.product_id.price)}
                </p>
            </td>
        </tr>
    )
}
