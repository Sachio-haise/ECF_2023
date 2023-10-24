import React, { useEffect, useState } from 'react'

interface CartProps {
    quantity: string
    productQty: string
    qty: number
    setQty: React.Dispatch<React.SetStateAction<number>>
    price: string
    subtotal: number
    setSubtotal: React.Dispatch<React.SetStateAction<number>>

}
export const Counter = ({
    quantity,
    productQty,
    setQty,
    qty,
    setSubtotal,
    subtotal,
    price,
}: CartProps) => {
    useEffect(() => {
        setQty(Number(quantity))
    }, [])

    const taxPercent = (amount: number) => {
        return Math.ceil(amount * 0.1)
    }

    const addQuantity = () => {
        if (Number(qty) < Number(productQty)) {
            setQty(Number(qty) + 1)
            setSubtotal(subtotal + Number(price))

        }
    }
    const reduceQaantity = () => {
        if (Number(qty) > 1) {
            setQty(Number(qty) - 1)
            setSubtotal(subtotal - Number(price))

        }
    }
    return (
        <div>
            <div className="flex justify-left">
                <div className="mb-4 flex items-center font-bold  w-fit text-lg">
                    <span
                        className=" cursor-pointer  border-gray-400 text-2xl px-4 py-[0.35rem] border-2 rounded-tl-md  rounded-bl-md hover:bg-gray-400 transition-all duration-150 hover:text-gray-100"
                        onClick={addQuantity}>
                        +
                    </span>
                    <span className="border-t-2 px-6 py-2 border-b border-gray-300-2 border-gray-400 ">
                        {qty}
                    </span>
                    <span
                        className=" cursor-pointer text-3xl px-4 py-1 border-2 rounded-br-md  rounded-tr-md border-gray-400 hover:bg-gray-400 transition-all duration-150 hover:text-gray-100"
                        onClick={reduceQaantity}>
                        -
                    </span>
                </div>
            </div>
        </div>
    )
}
