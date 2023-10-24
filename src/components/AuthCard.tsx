import { PropsWithChildren } from 'react'
import Link from 'next/link'
import ApplicationLogo from './ApplicationLogo'
import Header from './Layouts/Client/Header'
import Footer from './Layouts/Client/Footer'

const AuthCard = ({ children }: PropsWithChildren) => (
    <div>
        <div className=" py-28 flex flex-col sm:justify-center items-center  bg-gray-100 dark:bg-gray-200">
            <div className="w-full sm:max-w-md px-6 py-4 bg-white dark:bg-white shadow-md overflow-hidden sm:rounded-sm ">
                {children}
            </div>
        </div>

    </div>
)

export default AuthCard
