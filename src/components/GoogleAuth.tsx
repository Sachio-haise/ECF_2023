import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface ContentProps {
    content : string
}

const GoogleAuth = ({content}:ContentProps) => {
    const [loginUrl, setLoginUrl] = useState(null)
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    useEffect(() => {
        fetch(`${baseURL}/api/auth`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Something went wrong!')
            })
            .then(data => setLoginUrl(data.url))
            .catch(error => console.error(error))
    }, [])
    return (
        <div>
            {loginUrl != null && (
                <Link
                    href={loginUrl}
                    className="flex items-center shadow-md  rounded-md p-2 justify-center mt-4 cursor-pointer hover:bg-gray-100">
                    <Image
                        src="assets/images/icons/google.svg"
                        width={20}
                        height={20}
                        alt="google.svg"
                    />
                    <p className="ml-4 font-bold  text-[15px] text-gray-700 ">
                     {content}
                    </p>
                </Link>
            )}
        </div>
    )
}

export default GoogleAuth
