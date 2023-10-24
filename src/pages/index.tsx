import Head from 'next/head'
import Link from 'next/link'
import Slider from 'react-slick'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Player, {
    PlayerInterface,
    Track,
    TrackModel,
} from 'react-material-music-player'

import { useEffect, useState } from 'react'

import { ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax'
import { categoryProps, productProps, PaginatedResponseData } from '@/type/type'

// component
import Header from '@/components/Layouts/Client/Header'
import Image from 'next/image'

// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ProductCard from '@/components/ProductCard'
import BlogCard from '@/components/BlogCard'
import Footer from '@/components/Layouts/Client/Footer'
import { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'
import GuestLayout from '@/components/Layouts/GuestLayout'
{
    /*  <AudioPlayer
                        autoPlay
                        src="/music/Luis-Fonsi-Ft-Daddy-Yankee-Despacito-(TrendyBeatz.com).mp3"
                        onPlay={e => console.log('onPlay')}
                        // other props here
    />*/
}
interface HomeProps {
    categories: categoryProps[]
    products: PaginatedResponseData<productProps>
}

const Home: NextPage<HomeProps> = ({ categories, products }) => {
    const { user } = useAuth({ middleware: 'guest' })
    const router = useRouter()

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    }

    const settingsTwo = {
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrow: true,
    }
    return (
        <GuestLayout>
             <ToastContainer />
            {/* Main*/}
            <div className=" max-w-[1534px] mx-auto">
                <Slider {...settings}>
                    <div key="1" className=" relative h-[540px] w-full">
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            <Image
                                className="object-cover object-center"
                                src="/assets/images/product/sit.jpg"
                                alt="product.jpg"
                                fill
                            />
                        </a>
                    </div>
                    <div key="2" className="relative h-[540px] w-full">
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            <Image
                                className="object-cover object-center"
                                src="/assets/images/product/sit.jpg"
                                alt="product.jpg"
                                fill
                            />
                        </a>
                    </div>
                </Slider>
                <div className="grid grid-rows-2 grid-flow-col gap-4 container mx-auto mt-10">
                    <div className="col-span-1">
                        <Image
                            src="/assets/images/product/sit-1.jpg"
                            width={450}
                            height={140}
                            alt="sit-1.jpg"
                        />
                    </div>
                    <div className=" col-span-1">
                        <Image
                            src="/assets/images/product/sit-1.jpg"
                            width={450}
                            height={100}
                            alt="sit-1.jpg"
                        />
                    </div>
                    <div className="row-span-3 col-span-2 relative">
                        <Image
                            src="/assets/images/product/sit-1.jpg"
                            width={850}
                            height={100}
                            alt="sit-1.jpg"
                        />
                        <span className="absolute text-[12px] sm:text-[15px] md:text-[25px] font-bold flex justify-center w-full text-gray-200 bottom-[42%]">
                            WHITE FURNITURE
                        </span>
                    </div>
                    <div className="col-span-1">
                        <Image
                            src="/assets/images/product/sit-1.jpg"
                            width={450}
                            height={100}
                            alt="sit-1.jpg"
                        />
                    </div>
                    <div className="col-span-1">
                        <Image
                            src="/assets/images/product/sit-1.jpg"
                            width={450}
                            height={100}
                            alt="sit-1.jpg"
                        />
                    </div>
                </div>

                <div className=" mt-10 relative flex justify-center">
                    <p className="uppercase font-bold text-gray-800 text-[25px] text-center ">
                        Best collection 2023
                    </p>
                    <span className="h-1 w-24 bg-[#9bb47e] absolute bottom-[-10%]"></span>
                </div>
                <div className="text-center mt-8 space-y-2 ">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        In, veritatis?
                    </p>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>

                {/*<div className="mb-5 mt-12">
                    <ul
                        className="flex flex-wrap -mb-px text-sm font-medium text-center justify-center"
                        id="myTab"
                        data-tabs-toggle="#myTabContent"
                        role="tablist">
                            {/*
                                products.data.slice(0,5).map(product => (
                                    <li className="mr-2" role="presentation">
                                    <button
                                        className="inline-block p-4 px-1 md:px-4 border-b-2 rounded-t-lg"
                                        id={product.category.title}
                                        data-tabs-target=  {`#` + product.category.title}
                                        type="button"
                                        role="tab"
                                        aria-controls={product.category.title}
                                        aria-selected="false">
                                        {product.category.title}
                                    </button>
                                </li>
                                ))
                            }
                       <li className="mr-2" role="presentation">
                            <button
                                className="inline-block p-4 px-1 md:px-4 border-b-2 rounded-t-lg"
                                id="profile-tab"
                                data-tabs-target="#profile"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false">
                                Profile
                            </button>
                        </li>
                        <li className="mr-2" role="presentation">
                            <button
                                className="inline-block p-4 px-1 md:px-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                id="dashboard-tab"
                                data-tabs-target="#dashboard"
                                type="button"
                                role="tab"
                                aria-controls="dashboard"
                                aria-selected="false">
                                Dashboard
                            </button>
                        </li>
                        <li className="mr-2" role="presentation">
                            <button
                                className="inline-block p-4 px-1 md:px-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                id="settings-tab"
                                data-tabs-target="#settings"
                                type="button"
                                role="tab"
                                aria-controls="settings"
                                aria-selected="false">
                                Settings
                            </button>
                        </li>
                        <li role="presentation">
                            <button
                                className="inline-block p-4 px-1 md:px-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                id="contacts-tab"
                                data-tabs-target="#contacts"
                                type="button"
                                role="tab"
                                aria-controls="contacts"
                                aria-selected="false">
                                Contacts
                            </button>
                        </li>
                    </ul>
                </div>
                <div id="myTabContent">
                    <div
                        className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 transition-all place-items-center"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab">
                        {products?.data.slice(0,1).map(product => (
                            <ProductCard key={product.id} cardData={product} />
                        ))}
                    </div>
                <div
                        className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 transition-all place-items-center"
                        id="dashboard"
                        role="tabpanel"
                        aria-labelledby="dashboard-tab">
                        {products?.data.slice(0,2).map(product => (
                            <ProductCard key={product.id} cardData={product} />
                        ))}
                    </div>
                    <div
                        className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 transition-all place-items-center"
                        id="settings"
                        role="tabpanel"
                        aria-labelledby="settings-tab">
                        {products?.data.slice(0,3).map(product =>  (
                            <ProductCard key={product.id} cardData={product} />
                        ))}
                    </div>
                    <div
                        className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 transition-all place-items-center"
                        id="contacts"
                        role="tabpanel"
                        aria-labelledby="contacts-tab">
                        {products?.data.slice(0,4).map(product => (
                            <ProductCard key={product.id} cardData={product} />
                        ))}
                    </div>
                </div>
                */}
                <div
                    className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 transition-all place-items-center"
                    id="dashboard"
                    role="tabpanel"
                    aria-labelledby="dashboard-tab">
                    {products?.data.slice(0, 5).map(product => (
                        <ProductCard key={product.id} cardData={product} />
                    ))}
                </div>

                <Link
                    href="/product"
                    className="font-bold text-[#85d3ca] text-lg flex items-center justify-end">
                    See all products{' '}
                    <Image
                        src="/assets/images/icons/arrow-right.svg"
                        width={18}
                        height={18}
                        alt="angle-left.svg"
                        className="ml-1"
                    />
                </Link>
            </div>
            <div className="bg-[#EDEBC4] mt-10  w-full  ">
                <div className="container xl:max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 mx-auto py-10">
                    <div className="flex items-center justify-center md:justify-start pb-5 md:pb-0">
                        <div className=" space-y-8">
                            <p className=" w-fit font-bold text-[18px] text-gray-600 pb-1 border-b-2 border-gray-900">
                                Featured
                            </p>

                            <p className=" font-bold text-[20px] text-gray-800 ">
                                Gift picnic in beautiful design <br />
                                from Esme Desinger
                            </p>
                            <p className="font-bold text-[24px] text-[#85d3ca]">
                                $ 10,500 - $ 19,990
                            </p>
                            <p className=" cursor-pointer hover:bg-gray-800 duration-300 hover:text-gray-300 transition-all w-fit uppercase font-bold p-2 border-2 border-gray-800">
                                Shop Now
                            </p>
                        </div>
                    </div>
                    <div className="w-[350px] mx-auto sm:w-full flex items-center">
                        <div>
                            <Image
                                src="/assets/images/product/box-1.png"
                                alt="box.png"
                                width={550}
                                height={450}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <div className="container gap-x-4 grid md:grid-rows-3 md:grid-flow-col grid-cols-1 md:grid-cols-5 2xl:grid-cols-5  mx-auto py-10">
                    <div className="flex md:col-span-3 lg:col-span-2 justify-between md:row-span-1 bg-[#85d3ca] items-center rounded-sm p-2 px-10 2xl:p-4 2xl:px-10">
                        <div className="text-gray-700 space-y-2 font-bold">
                            <p className=" text-[18px]">Sale up to</p>
                            <p className=" text-[28px]">35 % OFF</p>
                            <p className=" text-[18px]">
                                Apply to the Collection 2023
                            </p>
                        </div>
                        <div>
                            <Image
                                src="/assets/images/product/box-2.png"
                                alt="box-2.png"
                                width={150}
                                height={150}
                            />
                        </div>
                    </div>

                    <div className="flex md:col-span-3 lg:col-span-2 justify-between md:row-span-2 2xl:row-span-2 mt-5 bg-[#E0E7D5] items-center rounded-sm px-5 md:py-4 py-2 2xl:px-10 2xl:p-8 ">
                        <div className="text-gray-700 space-y-1 sm:space-y-3 md:space-y-1 2xl:space-y-2 font-bold">
                            <p className="text-[10px] sm:text-[12px]  2xl:text-[18px]">
                                Sale up to
                            </p>
                            <p className="text-[12px] sm:text-[14px]  2xl:text-[20px]">
                                GIFTS FOR
                            </p>
                            <p className="text-[12px] sm:text-[14px]  2xl:text-[20px]">
                                LUNAR NEW YEAR
                            </p>
                            <p className="text-[10px]  2xl:text-[14px] text-gray-500">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Esse facilis vitae atque ipsa
                                maiores error?{' '}
                            </p>
                            <p className="text-gray-800 bg-gray-100 rounded-sm p-1 sm:p-2 2xl:p-3 cursor-pointer hover:bg-transparent hover:border-2 border-2 border-gray-100 hover:border-gray-800 transition-all duration-300 w-fit text-[10px] sm:text-[12px] 2xl:text-[15px]">
                                SHOP NOW
                            </p>
                        </div>
                        <div className=" hidden md:block">
                            <Image
                                src="/assets/images/product/sit-3.png"
                                alt="box-2.png"
                                width={900}
                                height={900}
                            />
                        </div>

                        <div className=" block md:hidden">
                            <Image
                                src="/assets/images/product/sit-3.png"
                                alt="box-2.png"
                                width={300}
                                height={300}
                            />
                        </div>
                    </div>
                    <div className=" mt-5 md:mt-0 md:col-span-2 lg:col-span-3 2xl:col-span-3 row-span-3">
                        <div className=" ml-8 sm:ml-0">
                            <span className=" uppercase text-gray-800 text-[15px] sm:text-[20px] md::text-[25px] font-bold">
                                Spring Summer 2023 collection <br /> by ferm
                                living
                            </span>{' '}
                            <span onClick={() => router.push('/product')} className=" text-yellow-300 font-bold text-[14px] ml-4 sm:ml-6 cursor-pointer hover:underline">
                                View all
                            </span>
                        </div>

                        <div
                            id="animation-carousel"
                            className="relative w-full"
                            data-carousel="static">
                            {/* Carousel wrapper */}
                            <div className="relative h-[25rem] overflow-hidden rounded-lg 2xl:h-[30rem]">
                                {/* Item 1 */}
                                <div
                                    className="flex items-center justify-around mt-6 2xl:mt-10"
                                    data-carousel-item="1">
                                    <div
                                        className={`w-[300px] 2xl:w-[350px] 2xl-w-[280px] relative  group 2xl:space-y-6`}>
                                        <p className="absolute text-[#9bb47e] font-bold border-2 border-[#9bb47e] px-2 rounded-sm transition-all left-[100px] opacity-0 -top-2 group-hover:top-10 duration-500 group-hover:opacity-100 hover:opacity-100 hover:cursor-pointer hover:bg-[#9bb47e] hover:text-gray-100">
                                            Save
                                        </p>

                                        <div
                                            className={`bg-gray-100 h-[20rem] md:h-[20rem] flex justify-center items-center`}>
                                            <div>
                                                <Image
                                                    src="/assets/images/product/sit-2.png"
                                                    alt="sit-2.png"
                                                    width={200}
                                                    height={100}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <div>
                                                <p className="text-gray-400">
                                                    Special Chair
                                                </p>
                                                <p className="text-gray-400">
                                                    $ 20.34
                                                </p>
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
                                    <div
                                        className={`w-[300px] 2xl:w-[350px] 2xl-w-[280px] relative  group 2xl:space-y-6 hidden lg:block`}>
                                        <p className="absolute text-[#9bb47e] font-bold border-2 border-[#9bb47e] px-2 rounded-sm transition-all left-[100px] opacity-0 -top-2 group-hover:top-10 duration-500 group-hover:opacity-100 hover:opacity-100 hover:cursor-pointer hover:bg-[#9bb47e] hover:text-gray-100">
                                            Save
                                        </p>

                                        <div
                                            className={`bg-gray-100 h-[18rem] md:h-[20rem] flex justify-center items-center`}>
                                            <div>
                                                <Image
                                                    src="/assets/images/product/sit-2.png"
                                                    alt="sit-2.png"
                                                    width={200}
                                                    height={100}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <div>
                                                <p className="text-gray-400">
                                                    Special Chair
                                                </p>
                                                <p className="text-gray-400">
                                                    $ 20.34
                                                </p>
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
                                </div>

                                {/* Item 1 */}
                                <div
                                    className="flex items-center justify-around mt-6 2xl:mt-10"
                                    data-carousel-item="2">
                                    <div
                                        className={`w-[300px] 2xl:w-[350px] 2xl-w-[280px] relative  group 2xl:space-y-6 hidden lg:block`}>
                                        <p className="absolute text-[#9bb47e] font-bold border-2 border-[#9bb47e] px-2 rounded-sm transition-all left-[100px] opacity-0 -top-2 group-hover:top-10 duration-500 group-hover:opacity-100 hover:opacity-100 hover:cursor-pointer hover:bg-[#9bb47e] hover:text-gray-100">
                                            Save
                                        </p>

                                        <div
                                            className={`bg-gray-100 h-[18rem] md:h-[20rem] flex justify-center items-center`}>
                                            <div>
                                                <Image
                                                    src="/assets/images/product/sit-2.png"
                                                    alt="sit-2.png"
                                                    width={200}
                                                    height={100}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <div>
                                                <p className="text-gray-400">
                                                    Special Chair
                                                </p>
                                                <p className="text-gray-400">
                                                    $ 20.34
                                                </p>
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
                                </div>
                            </div>
                            {/* Slider controls */}
                            <button
                                type="button"
                                className="absolute top-0 left-[10%] md:left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                data-carousel-prev="">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                    <svg
                                        className="w-4 h-4 text-white dark:text-gray-200"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10">
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 1 1 5l4 4"
                                        />
                                    </svg>
                                    <span className="sr-only">Previous</span>
                                </span>
                            </button>
                            <button
                                type="button"
                                className="absolute top-0 right-[10%] md:right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                data-carousel-next="">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                    <svg
                                        className="w-4 h-4 text-white dark:text-gray-200"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10">
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                    <span className="sr-only">Next</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5  relative">
                <ParallaxProvider>
                    <ParallaxBanner
                        layers={[
                            {
                                image: 'https://www.ghidini1961.com/uploads/prodotti/124/frame_dining_table_parallax.jpg',
                                speed: -15,
                            },
                        ]}
                        className="aspect-[3/1]"
                    />
                </ParallaxProvider>
                <div className="w-full text-center absolute top-[46%] text-[12px] sm:text-[14px] md:text-[20px] lg:text-[25px]">
                    <a className=" uppercase font-bold text-gray-100 ">
                        Maritime Chair by benjamin hubert for casmania
                    </a>
                </div>
            </div>
            <div className="mt-10">
                <p className='text-center w-fit mx-auto font-bold text-[25px] after:absolute after:content-[""] after:h-[2px] after:w-14 after:bg-[#9bb47e]  after:top-9 after:left-2 relative'>
                    BLOG
                </p>
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-5  place-items-center">
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                </div>
            </div>
            <div className="bg-gray-200">
                <div className="mt-8 bg-gray-200 grid grid-cols-2 lg:grid-cols-4 place-items-center container mx-auto lg:space-x-24 ">
                    <Image
                        src="/assets/images/product/logo-1.png"
                        width={200}
                        height={200}
                        alt="logo-1.png"
                        className="opacity-70 "
                    />
                    <Image
                        src="/assets/images/product/logo-2.png"
                        width={200}
                        height={200}
                        alt="logo-2.png"
                        className="opacity-70 "
                    />
                    <Image
                        src="/assets/images/product/logo-3.png"
                        width={200}
                        height={200}
                        alt="logo-3.png"
                        className="opacity-70 "
                    />
                    <Image
                        src="/assets/images/product/logo-4.png"
                        width={200}
                        height={200}
                        alt="logo-4.png"
                        className="opacity-70 "
                    />
                </div>
            </div>

            {/* Main*/}
        </GuestLayout>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps<any> = async ({
    query,
}: any) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    let categories: categoryProps[] = []
    let products: PaginatedResponseData<productProps>[] = []
    let category = query.category || ''

    try {
        const { data } = await axios.get(`${baseURL}/api/categories`)
        categories = data.data
    } catch (e) {}

    try {
        const { data } = await axios.get(
            `${baseURL}/api/products?page=${query.page}&category=${category}`,
        )
        products = data
    } catch (e) {}

    return { props: { categories, products } }
}
