import React, { useEffect, useState } from 'react'

import { categoryProps, productProps, PaginatedResponseData } from '@/type/type'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Layouts/Client/Footer'
import Header from '@/components/Layouts/Client/Header'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import AppLayout from '@/components/Layouts/AppLayout'
import GuestLayout from '@/components/Layouts/GuestLayout'

interface ProductsProps {
    categories: categoryProps[]
    products: PaginatedResponseData<productProps>
}

const index = ({ categories, products }: ProductsProps) => {
    const router = useRouter()
    const [dropDown, setDropDown] = useState('hidden')
    const searchParams = useSearchParams()
    const { category } = router.query
    let paramArray: string[] = []
    if (typeof category === 'string') {
        paramArray = category.split(',')
    } else if (Array.isArray(category)) {
        paramArray = category
    }
    const routeParams = searchParams.get('category')

    const valueToRemove = '2'
    const updatedParamArray = paramArray.filter(
        value => value !== valueToRemove,
    )

    const updatedParam =
        router.route +
        '?category=' +
        paramArray.filter(value => value !== valueToRemove).join(',')
    console.log(router.route + '?category=' + updatedParam)

    return (
        <GuestLayout>
            <Head>
                <title>Product List</title>
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>

            </Head>
            <div className="flex ">
                <div className="hidden sm:block">
                    <button
                        data-drawer-target="sidebar-multi-level-sidebar"
                        data-drawer-toggle="sidebar-multi-level-sidebar"
                        aria-controls="sidebar-multi-level-sidebar"
                        type="button"
                        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  ">
                        <span className="sr-only">Open sidebar</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                            />
                        </svg>
                    </button>
                    <aside
                        id="sidebar-multi-level-sidebar"
                        className=" w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                        aria-label="Sidebar">
                        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
                            <ul className="space-y-2 font-medium">
                                {/*   <li>
                                    <a
                                        href="#"
                                        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                        <svg
                                            className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 22 21">
                                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                        </svg>
                                        <span className="ml-3">Dashboard</span>
                                    </a>
                                </li>*/}

                                <li>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (dropDown === 'hidden') {
                                                setDropDown('block')
                                            } else {
                                                setDropDown('hidden')
                                            }
                                        }}
                                        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 "
                                        aria-controls="dropdown-example"
                                        data-collapse-toggle="dropdown-example">
                                        <svg
                                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 18 21">
                                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                        </svg>
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                                            Categories
                                        </span>
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6">
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 1 4 4 4-4"
                                            />
                                        </svg>
                                    </button>
                                    <ul
                                        id="dropdown-example"
                                        className={`${dropDown} py-2 space-y-2`}>
                                        <li>
                                            <a
                                                href="/product"
                                                className={`flex items-center w-full p-2  transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 ${
                                                    routeParams === null
                                                        ? 'bg-gray-100 text-darkBlue'
                                                        : 'text-gray-900'
                                                }`}>
                                                All
                                            </a>
                                        </li>
                                        {categories.map((category, index) => (
                                            <li key={index}>
                                                <a
                                                    href={`/product?category=${category.id}`}
                                                    className={`flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 ${
                                                        Number(routeParams) ===
                                                        category.id
                                                            ? 'bg-gray-100 text-darkBlue'
                                                            : 'text-gray-900'
                                                    }`}>
                                                    {category.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>

                <div className="container mx-auto  mt-6">
                    <div className="flex items-center justify-center md:justify-end ">
                        {products.meta.links.map((link, index) => (
                            <div key={index}>
                                {link.label === '&laquo; Previous' &&
                                link.url != null ? (
                                    <Link
                                        href={`/product?page=${
                                            products.meta.current_page - 1
                                        }`}>
                                        <div className="bg-[#3c8179] cursor-pointer py-[1.7px] border-2 border-[#3c8179] px-[6px]">
                                            <Image
                                                src="/assets/images/icons/angle-left.svg"
                                                width={10}
                                                height={10}
                                                alt="angle-right.svg"
                                            />
                                        </div>
                                    </Link>
                                ) : link.label === 'Next &raquo;' &&
                                  link.url != null ? (
                                    <Link
                                        href={`/product?page=${
                                            products.meta.current_page + 1
                                        }`}>
                                        <div className="bg-[#3c8179] py-[1.7px] border-2 border-[#3c8179] px-[6px]">
                                            <Image
                                                src="/assets/images/icons/angle-right.svg"
                                                width={10}
                                                height={10}
                                                alt="angle-right.svg"
                                            />
                                        </div>
                                    </Link>
                                ) : (
                                    <div>
                                        {link.label != '&laquo; Previous' &&
                                            link.label != 'Next &raquo;' && (
                                                <Link
                                                    href={`/product?page=${link.label}`}
                                                    className={` cursor-pointer hover:bg-[#3c8179] hover:text-gray-200 transition-all duration-200 border-2 font-bold text-gray-600 mx-2 border-[#3c8179] px-2 ${
                                                        link.active
                                                            ? 'bg-[#3c8179] text-white'
                                                            : ''
                                                    }`}>
                                                    {link.label}
                                                </Link>
                                            )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 justify-items-center">
                        {products?.data.map(product => (
                            <ProductCard key={product.id} cardData={product} />
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}

export default index

export const getServerSideProps: GetServerSideProps<any> = async ({
    query,
}: any) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    let categories: categoryProps[] = []
    let products: PaginatedResponseData<productProps>[] = []
    console.log(query.category)
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
