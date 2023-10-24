import { PropsWithChildren ,ReactNode } from 'react'
import Head from 'next/head'
import Footer from './Client/Footer'
import Header from './Client/Header'
import { useAuth } from '@/hooks/auth'
import { categoryProps } from '@/type/type'
interface Props {
    header: ReactNode
}

const GuestLayout = ({  children }: PropsWithChildren) => {
    const { user } = useAuth({ middleware: 'guest' })
    console.log(user)
    return (
        <div>
            <Header />
            {/*<Head>
                <title>Ecommerce</title>
    </Head>*/}

            <div className="font-sans  antialiased">{children}</div>
            <Footer />
        </div>
    )
}

export default GuestLayout
