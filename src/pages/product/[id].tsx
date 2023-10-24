import Footer from '@/components/Layouts/Client/Footer'
import Header from '@/components/Layouts/Client/Header'
import Image from 'next/image'
import React, { useState } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import { productProps } from '@/type/type'
import { GetServerSideProps, NextPage } from 'next'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'
import Head from 'next/head'
import { toast } from 'react-toastify'

interface ProductProps {
    product: productProps
}

const ProductDetail = ({ product }: ProductProps) => {
    const router = useRouter()
    const { user } = useAuth({ middleware: 'guest' })
    const [maxQty, setMaxQty] = useState(Number(product.xs))
    const [quantity, setQuantity] = useState<number>(maxQty === 0 ? 0 : 1)
    const [gallery, setGallery] = useState<string[]>(product.gallery)
    const [size, setSize] = useState<string>('xs')
    const [figure, setFigure] = useState<string>(product.gallery[0])
    const [loader, setLoader] = useState(false)

    const addQuantity = () => {
        if (quantity < Number(maxQty)) {
            setQuantity(quantity + 1)
        }
    }
    function discountPrice(price: string, discount: string): string {
        return parseFloat(
            String(Number(price) - (Number(price) * Number(discount)) / 100),
        ).toFixed(2)
    }
    const reduceQaantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleMaxQty = (size: string) => {
        if (size === 'xs') {
            setMaxQty(Number(product.xs))
            product.xs === '0' ? setQuantity(0) : setQuantity(1)
        }
        if (size === 'sm') {
            setMaxQty(Number(product.sm))
            product.sm === '0' ? setQuantity(0) : setQuantity(1)
        }
        if (size === 'md') {
            setMaxQty(Number(product.md))
            product.md === '0' ? setQuantity(0) : setQuantity(1)
        }
        if (size === 'lg') {
            setMaxQty(Number(product.lg))
            product.lg === '0' ? setQuantity(0) : setQuantity(1)
        }
        if (size === 'xl') {
            setMaxQty(Number(product.xl))
            product.xl === '0' ? setQuantity(0) : setQuantity(1)
        }

        if (size === '2xl') {
            setMaxQty(Number(product._2xl))
            product._2xl === '0' ? setQuantity(0) : setQuantity(1)
        }
        if (size === '3xl') {
            setMaxQty(Number(product._3xl))
            product._3xl === '0' ? setQuantity(0) : setQuantity(1)
        }
        console.log(maxQty)
    }
    const handleAddToCart = async () => {
        if (user) {
            setLoader(true)

            try {
                const formData = new FormData()
                formData.append('user_id', String(user.id))
                formData.append('quantity', String(quantity))
                formData.append('size', size)
                formData.append('product_id', String(product.id))
                formData.append('sizeQty', String(maxQty))

                const res = await axios.post(`/api/add-to-cart`, formData)
            } catch (e) {
                console.log(e)
            }
            router.replace(router.asPath)
            setLoader(false)
            toast.success(<p className='font-bold'>Added to Cart</p>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } else {
            router.push('/login')
        }
    }

    console.log(product)
    return (
        <GuestLayout>
            <Head>
                <title>Product</title>
            </Head>
            {/* Main*/}
            <div className="my-8 container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div>
                    <Image
                        src={figure}
                        width={800}
                        height={600}
                        className=" max-h-[600px]"
                        alt="box-1.png"
                    />

                    <div className="my-4 flex items-center justify-between">
                        {gallery.map(item => (
                            <div
                                className=" overflow-hidden"
                                onClick={() => {
                                    // let temp = item
                                    // item = figure
                                    setFigure(item)
                                }}>
                                <Image
                                    src={item}
                                    width={180}
                                    height={180}
                                    alt="box-1.png"
                                    className=" hover:cursor-pointer transition-all duration-200 hover:scale-110 max-w-[150px] max-h-[150px]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className=" ml-6">
                    <div className="flex  items-center">
                        <h2 className=" font-bold text-darkBlue text-lg md:text-2xl lg:text-4xl">
                            {product.title}{' '}
                        </h2>

                        {maxQty === 0 && (
                            <p className="ml-4 rotate-12 animate-bounce bg-red-500 p-1 rounded-md text-white font-bold w-fit text-sm">
                                Out of stock
                            </p>
                        )}
                    </div>
                    <h3 className=" font-bold text-sm md:text-lg lg:text-xl">
                        {product.subtitle}
                    </h3>
                    <div className="text-sm md:text-lg lg:text-xl text-gray-600  my-4">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: product.description,
                            }}
                        />
                    </div>

                    {product.discount !== '0' ? (
                        <div className="flex items-center">
                            <p className=" line-through text-2xl text-[#3c8179] font-bold">
                                $ {product.price}.00
                            </p>
                            <p className=" ml-4 text-3xl text-[#d14950] font-bold">
                                ${' '}
                                {discountPrice(product.price, product.discount)}
                            </p>
                        </div>
                    ) : (
                        <p className="text-3xl text-[#3c8179] font-bold">
                            $ {product.price}
                        </p>
                    )}

                    <select
                        name=""
                        defaultValue={size}
                        id=""
                        className=" cursor-pointer  my-4 px-4 py-2 rounded-md focus:border-2 focus:ring-0 ring-[#3c8179] focus:border-[#3c8179]  border-2 bg-gray-100"
                        onChange={e => {
                            setSize(e.target.value)
                            handleMaxQty(e.target.value)
                        }}>
                        <option value="xs">xs</option>
                        <option value="sm">sm</option>
                        <option value="md">md</option>
                        <option value="lg">lg</option>
                        <option value="xl">xl</option>
                        <option value="2xl">2xl</option>
                        <option value="3xl">3xl</option>
                    </select>

                    {/* <div className="mb-4 flex items-center font-bold  w-fit text-lg">
                        <span
                            className=" cursor-pointer  border-gray-400 text-2xl px-4 py-[0.35rem] border-2 rounded-tl-md  rounded-bl-md hover:bg-gray-400 transition-all duration-150 hover:text-gray-100"
                            onClick={addQuantity}>
                            +
                        </span>
                        <span className="border-t-2 px-6 py-2 border-b-2 border-gray-400 ">
                            {quantity}
                        </span>
                        <span
                            className=" cursor-pointer text-3xl px-4 py-1 border-2 rounded-br-md  rounded-tr-md border-gray-400 hover:bg-gray-400 transition-all duration-150 hover:text-gray-100"
                            onClick={reduceQaantity}>
                            -
                        </span>
                    </div>*/}

                    {maxQty !== 0 && (
                        <div
                            className="  flex items-center bg-[#3c8179] cursor-pointer border-2 transition-all divide-fuchsia-200 text-white px-4 py-2 rounded-md w-fit font-bold hover:bg-lightGreen hover:border-2 hover:border-lightGreen "
                            onClick={handleAddToCart}>
                            {loader && (
                                <div role="status">
                                    <svg
                                        aria-hidden="true"
                                        className="inline w-4 h-4 mr-2 mb-[1px] text-gray-300 animate-spin  fill-gray-200"
                                        viewBox="0 0 100 101"
                                        fill="gray"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            )}
                            Add To Cart
                            <Image
                                width={20}
                                height={20}
                                className="ml-2"
                                src="/assets/images/icons/cart.svg"
                                alt="cart"
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* Main*/}
        </GuestLayout>
    )
}

export default ProductDetail

export const getServerSideProps: GetServerSideProps<any> = async ({
    query,
}: any) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    let product: productProps[] = []
    console.log(query.page)
    try {
        const { data } = await axios.get(`${baseURL}/api/products/${query.id}`)
        product = data.data
    } catch (e) {}

    return { props: { product } }
}
