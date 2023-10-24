import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="bg-[#252525]">
    <div className=" py-12 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
            <p className=" tracking-widest text-[30px] mb-8 text-[#85d3ca] font-bold">
                Ella
            </p>
            <p className=" text-gray-500 mb-4 ">
                Check out our latest collection of stylish and
                comfortable sneakers. Elevate your footwear game
                with the perfect blend of fashion and comfort.
            </p>
            <p className=" text-gray-500 ">
                Shop now and step into style! #NewArrivals
                #FashionFootwear
            </p>
            <input
                className="p-2 mt-10 outline-none border-none ring-0 rounded-sm my-4 w-11/12"
                placeholder="Your email address..."
            />
            <button className="text-gray-200 bg-black font-bold  w-11/12 p-2 rounded-sm">
                Subscribe
            </button>
        </div>
        <div>
            <p className="uppercase font-bold tracking-widest text-gray-200 text-[22px]">
                Recent posts
            </p>
            <div className=" flex items-start mt-6">
                <Image
                    src="/assets/images/product/sit-1.jpg"
                    width={60}
                    height={60}
                    alt="product.jpg"
                />
                <div className="ml-4 space-y-2 font-bold text-gray-500">
                    <p> Dream up fortune </p>
                    <p>Feb 4, 2004</p>
                </div>
            </div>
            <div className=" flex items-start mt-6">
                <Image
                    src="/assets/images/product/sit-1.jpg"
                    width={60}
                    height={60}
                    alt="product.jpg"
                />
                <div className="ml-4 space-y-2 font-bold text-gray-500">
                    <p> Dream up fortune </p>
                    <p>Feb 4, 2004</p>
                </div>
            </div>
            <div className=" flex items-start mt-6">
                <Image
                    src="/assets/images/product/sit-1.jpg"
                    width={60}
                    height={60}
                    alt="product.jpg"
                />
                <div className="ml-4 space-y-2 font-bold text-gray-500">
                    <p> Dream up fortune </p>
                    <p>Feb 4, 2004</p>
                </div>
            </div>
            <div className=" flex items-start mt-6">
                <Image
                    src="/assets/images/product/sit-1.jpg"
                    width={60}
                    height={60}
                    alt="product.jpg"
                />
                <div className="ml-4 space-y-2 font-bold text-gray-500">
                    <p> Dream up fortune </p>
                    <p>Feb 4, 2004</p>
                </div>
            </div>
        </div>
        <div>
            <p className="uppercase font-bold tracking-widest text-gray-200 text-[22px]">
                Tags
            </p>
            <div className="flex mt-4 space-x-4">
                <p className="p-2 py-1 cursor-pointer hover:border-gray-200 hover:text-gray-200 text-gray-500 border-2 w-fit font-bold text-[18px] border-gray-500">
                    blog
                </p>
                <p className="p-2 py-1 cursor-pointer hover:border-gray-200 hover:text-gray-200 text-gray-500 border-2 w-fit font-bold text-[18px] border-gray-500">
                    fashion
                </p>
            </div>
            <p className="mt-6 mb-2 uppercase font-bold tracking-widest text-gray-200 text-[22px]">
                Archives
            </p>
            <p className="border-b-[1px] my-4 w-11/12 border-gray-500 pb-3 font-bold text-gray-400">
                Decenber 2015
            </p>
            <p className="border-b-[1px] my-4 w-11/12 border-gray-500 pb-3 font-bold text-gray-400">
                Decenber 2015
            </p>
            <p className="border-b-[1px] my-4 w-11/12 border-gray-500 pb-3 font-bold text-gray-400">
                Decenber 2015
            </p>
        </div>
        <div>
            <p className="uppercase font-bold tracking-widest text-gray-200 text-[22px]">
                Contacts
            </p>
            <div className="my-4">
                <p className="uppercase font-bold tracking-widest text-gray-200 text-[16px]">
                    Office 1
                </p>
                <p className="border-b-[1px] my-2 w-11/12 border-gray-500 pb-3 font-bold text-gray-400 text-[14px]">
                    31 Landon St Green Boy Wt, <br />
                    United State
                </p>
            </div>
            <div className="my-4">
                <p className="uppercase font-bold tracking-widest text-gray-200 text-[16px]">
                    Office 2
                </p>
                <p className="border-b-[1px] my-2 w-11/12 border-gray-500 pb-3 font-bold text-gray-400 text-[14px]">
                    31 Landon St Green Boy Wt, <br />
                    United State
                </p>
            </div>
            <div className="my-4">
                <p className="uppercase font-bold tracking-widest text-gray-200 text-[16px]">
                    Phone Number
                </p>
                <p className="border-b-[1px] my-2 w-11/12 border-gray-500 pb-3 font-bold text-gray-400 text-[14px]">
                    (+0000) 12232323563434
                    <br />
                    (+0000) 12232323563434
                </p>
            </div>

            <div className="mt-4">
                <p className="uppercase font-bold tracking-widest text-gray-200 text-[16px]">
                    Emil Address
                </p>
                <p className="border-b-[1px] my-2 w-11/12 border-gray-500 pb-3 font-bold text-gray-400 text-[14px]">
                    haruto@gmail.com
                    <br />
                    kthemegame@gmail.com
                </p>
            </div>
        </div>
    </div>
    <hr className="border-1 border-gray-500 mb-1" />

    <div className="block space-y-4 pb-4 md:space-y-0 md:flex items-center justify-between py-2 container mx-auto">
        <Link href="https://akm-web-dev.vercel.app" target='#haruto' className=" font-bold hover:text-gray-200 text-[#85d3ca] cursor-pointer transition-all duration-300">
            {' '}
            @ 2023 All Rights Reserved By Haruto
        </Link>
        <div className="flex  space-x-2">
            <div className="border-[1px] hover:bg-gray-500 hover:border-gray-600 transition-all duration-300 ease-in-out cursor-pointer border-gray-100 rounded-2xl p-1">
                <Image
                    src="assets/images/icons/facebook.svg"
                    width={13}
                    height={13}
                    alt="facebook.svg"
                />
            </div>
            <div className="border-[1px] hover:bg-gray-500 hover:border-gray-600 transition-all duration-300 ease-in-out cursor-pointer border-gray-100 rounded-2xl p-1">
                <Image
                    src="assets/images/icons/instagram.svg"
                    width={13}
                    height={13}
                    alt="facebook.svg"
                />
            </div>
            <div className="border-[1px] hover:bg-gray-500 hover:border-gray-600 transition-all duration-300 ease-in-out cursor-pointer border-gray-100 rounded-2xl p-1">
                <Image
                    src="assets/images/icons/twitter.svg"
                    width={13}
                    height={13}
                    alt="facebook.svg"
                />
            </div>
            <div className="border-[1px] hover:bg-gray-500 hover:border-gray-600 transition-all duration-300 ease-in-out cursor-pointer border-gray-100 rounded-2xl p-1">
                <Image
                    src="assets/images/icons/youtube.svg"
                    width={13}
                    height={13}
                    alt="facebook.svg"
                />
            </div>
        </div>
    </div>
</div>
  )
}

export default Footer
