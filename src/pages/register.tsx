import AuthCard from '@/components/AuthCard'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState, FormEventHandler, useEffect } from 'react'
import Head from 'next/head'
import PrimaryButton from '@/components/PrimaryButton'
import Image from 'next/image'
import GoogleAuth from '@/components/GoogleAuth'

const Register = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState<any>([])



    const submitForm: FormEventHandler = event => {
        event.preventDefault()

        register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus: () => {},
        })
    }

    return (
        <GuestLayout>
            <Head>
                <title>Sign Up</title>
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>

            </Head>
            <AuthCard>
                <p className="text-[24px] font-bold text-center my-4">
                    Sign Up
                </p>

                <form onSubmit={submitForm}>
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="block mt-1 w-full"
                            onChange={event => setName(event.target.value)}
                            required
                            autoFocus
                        />

                        <InputError messages={errors.name} className="mt-2" />
                    </div>

                    {/* Email Address */}
                    <div className="mt-4">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                        />

                        <InputError messages={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="new-password"
                        />

                        <InputError
                            messages={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4">
                        <Label htmlFor="passwordConfirmation">
                            Confirm Password
                        </Label>

                        <Input
                            id="passwordConfirmation"
                            type="password"
                            value={passwordConfirmation}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setPasswordConfirmation(event.target.value)
                            }
                            required
                        />

                        <InputError
                            messages={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex mt-4 font-bold justify-center items-center space-x-4">
                        <span className=" w-32 h-[1px] bg-gray-400" />{' '}
                        <span>OR</span>
                        <span className=" w-32 h-[1px] bg-gray-400" />
                    </div>

                    {/* Google Sign Up */}

                 <GoogleAuth  content="Sign Up With Google"/>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href="/login"
                            className="underline text-sm text-gray-600 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-500 rounded-md focus:outline-none  focus:ring-offset-2dark:focus:ring-0 ffset-gray-800">
                            Already registered?
                        </Link>

                        <PrimaryButton className="ml-4">Register</PrimaryButton>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Register
