import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CardProps {
    cardData: {
        id: Number
        title: String
        description: String
        price: String
        image: String
        gallery: String[]
        quantity: String
        discount: String
        size: String
        created_at: String
    }
}
const ProductCard = ({ cardData }: CardProps) => {
    return (
        <Link href={`/product/${cardData.id}`}>
            <div
                className={`w-[250px] 2xl-w-[280px] relative  group space-y-6`}>
                <p className="absolute text-[#9bb47e] font-bold border-2 border-[#9bb47e] px-2 rounded-sm transition-all left-[100px] opacity-0 -top-2 group-hover:top-10 duration-500 group-hover:opacity-100 hover:opacity-100 hover:cursor-pointer hover:bg-[#9bb47e] hover:text-gray-100">
                    Save
                </p>

                <div
                    className={`bg-gray-100  h-[16rem] flex justify-center items-center`}>
                    <div>
                        <Image
                            src={`${cardData.image}`}
                            alt="sit-2.png"
                            width={200}
                            height={100}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                    <div>
                        <p className="text-gray-400">{cardData.title}</p>
                        <p className="text-gray-400">$ {cardData.price}</p>
                    </div>
                    <div className=" cursor-pointer">
                        <Image
                            src="/assets/images/icons/heart.svg"
                            height={20}
                            width={20}
                            alt="heart.svg"
                        />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
