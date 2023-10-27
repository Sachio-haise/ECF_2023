import { PaginatedResponseData, productProps } from '@/type/type'
import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'

interface HomeProps {
    products: PaginatedResponseData<productProps>
}

const test: NextPage<HomeProps> = ({ products }) => {
    console.log(products)
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

    const data = async () => {
        const { data } = await axios.get(`${baseURL}/api/products`)

        console.log(data)
    }
    return (
        <div>
            <button onClick={() => data()}>click</button>
        </div>
    )
}

export default test

export const getServerSideProps: GetServerSideProps<any> = async ({
    query,
}: any) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    let products: PaginatedResponseData<productProps>[] = []
    let category = query.category || ''

    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/products`)

        console.log(data)
    } catch (e) {
        console.log(e);

    }

    return { props: { products } }
}
