import Image from 'next/image'
import React, { useState } from 'react'
import { useAuth} from '@/hooks/auth'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useData } from '@/hooks/guest'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import { UserProps } from '@/type/type'

interface HeaderProps{
    user: UserProps
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const routeParams = searchParams.get('category')
    const [dropDown, setDropDown] = useState('hidden')

    const { user } = useAuth({ middleware: 'guest' })
    console.log(router.asPath)
    const { categories } = useData()
    return (
        <div className="bg-[#F5F5F5] py-2">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <div className="px-2 md:container mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center cursor-pointer ">
                    <Image
                        src="/assets/logo/site-logo.png"
                        alt="site-logo.png"
                        width={70}
                        height={80}
                    />
                    <span className="mt-2 text-[30px]">Ella</span>
                </Link>
                <div className="flex items-center mt-1">
                    <div className=" cursor-pointer uppercase font-bold space-x-4 hidden items-center text-gray-600 lg:text-[16px] md:flex">
                        <Link
                            href="/"
                            className={`hover:text-darkBlue ${
                                router.asPath === '/'
                                    ? 'text-darkBlue'
                                    : 'text-gray-600'
                            }`}>
                            Home
                        </Link>
                        <Link
                            href="/product"
                            className={`hover:text-darkBlue ${
                                router.asPath === '/product'
                                    ? 'text-darkBlue'
                                    : 'text-gray-600'
                            }`}>
                            Product
                        </Link>

                        {/*   <Link href="/">Blog</Link>
                        <Link href="/">Portfolio</Link>
                        <Link href="/">About us</Link>
                        <Link href="/">Contact us</Link>*/}
                    </div>

                    {user?.id ? (
                        <div className=" ml-4 lg:ml-20 flex items-center space-x-3">
                            {user.avatar ? (
                                <Link href="/profile">
                                    <Image
                                        className=" cursor-pointer rounded-2xl hover:border-lightBlue border-2 min-h-[28px] min-w-[29px]"
                                        src={user.avatar}
                                        width={28}
                                        height={28}
                                        alt="user-circle.svg"
                                    />
                                </Link>
                            ) : (
                                <Link href="/login">
                                    <Image
                                        className="cursor-pointer hover:border-lightBlue border-2 min-h-[28px] min-w-[29px] rounded-2xl"
                                        src="/assets/images/icons/user-circle.svg"
                                        width={24}
                                        height={24}
                                        alt="user-circle.svg"
                                    />
                                </Link>
                            )}
                            <Link href="/cart">
                                <svg
                                    className="cursor-pointer w-5 h-5 text-gray-600"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                </svg>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <Link
                                href="/register"
                                className=" cursor-pointer uppercase font-bold space-x-4 ml-4 text-[#3c8179] lg:text-[16px] ">
                                Sign Up
                            </Link>
                        </div>
                    )}

                    <div
                        className="relative space-y-[5px] pr-6 ml-8 block md:hidden"
                        onClick={() => setIsOpen(!isOpen)}>
                        <span
                            className={`${
                                isOpen
                                    ? 'block w-8 h-[2px]  transition ease transform duration-300 bg-gray-600 rotate-45 translate-y-[2.5px] '
                                    : ' block w-8 h-[2px] transition ease transform duration-300 bg-gray-600'
                            } `}></span>
                        <span
                            className={`${
                                isOpen
                                    ? ' opacity-0 transition ease transform duration-300 '
                                    : 'block w-7 h-[2px] bg-gray-600 transition ease transform duration-300 '
                            }`}></span>
                        <span
                            className={`${
                                isOpen
                                    ? 'opacity-0 transition ease transform duration-300 '
                                    : 'block w-8 h-[2px] bg-gray-600 transition ease transform duration-300 '
                            }`}></span>
                        <span
                            className={`${
                                isOpen
                                    ? 'block w-8 h-[2px]  transition ease transform duration-300 bg-gray-600 -rotate-45 -translate-y-[4.5px]  '
                                    : 'block w-5 h-[2px] bg-gray-600 transition ease transform duration-300 '
                            }`}></span>
                    </div>
                </div>
            </div>
            <div
                className={`md:hidden z-50 bg-gray-50 pt-2 pb-4 absolute space-y-1 flex flex-col pl-12 font-bold  w-full cursor-pointer  ${
                    isOpen
                        ? 'transition-all ease-in-out transform duration-500 h-auto opacity-100'
                        : 'transition-all ease-in-out transform  h-0 opacity-0 duration-500'
                }`}>
                <div
                    className={`cursor-pointer ${
                        router.asPath === '/'
                            ? 'text-darkBlue bg-gray-100'
                            : 'text-gray-500'
                    }`}>
                    Home
                </div>
                <div className={`cursor-pointer `}>
                    <p
                        className={`cursor-pointer `}
                        onClick={() => {
                            if (dropDown === 'hidden') {
                                setDropDown('block')
                            } else {
                                setDropDown('hidden')
                            }
                        }}>
                        Categories
                    </p>

                    <div
                        className={`bg-gray-50 w-full px-2 py-1 cursor-pointer text-sm   transition-all delay-100  ${dropDown}`}>
                        <Link
                            href={'/product'}
                            className={`${
                                router.asPath === '/product'
                                    ? 'text-darkBlue bg-gray-100'
                                    : 'text-gray-500'
                            }`}>
                            All
                        </Link>
                        {categories?.map(category => (
                            <Link
                                href={`/product?category=${category.id}`}
                                key={category.id}
                                className={`block  ${
                                    Number(routeParams) === category.id
                                        ? 'bg-gray-100 text-darkBlue'
                                        : 'text-gray-900'
                                }`}>
                                {category.title}
                            </Link>
                        ))}
                    </div>
                </div>

                {/*<span>Blog</span>
                <span>Portfolio</span>
                <span>About us</span>
                <span>Contact us</span>*/}
            </div>
        </div>
    )
}

export default Header
