import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { Transition } from '@headlessui/react'

import { FormEventHandler, useState } from 'react'
import axios, { csrf } from '@/lib/axios'
import PrimaryButton from '@/components/PrimaryButton'
import Image from 'next/image'

const UpdatePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState<any>('')
    const [password, setPassword] = useState<any>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<any>('')
    const [loader, setLoader] = useState<boolean>(false)
    const [errors, setErrors] = useState<any>([])
    const [status, setStatus] = useState<string | null>(null)
    const [pwdStatus, setPwdStatus] = useState<any>({
        pwd: false,
        pwd_2: false,
        pwd_3: false,
    })

    const changeStatus = (name: any) => {
        console.log(name == 'pwd' && pwdStatus.pwd === false)
        if (name == 'pwd' && pwdStatus.pwd === false) {
            setPwdStatus({
                ...pwdStatus,
                pwd: true,
            })
        } else if (name == 'pwd' && pwdStatus.pwd === true) {
            setPwdStatus({
                ...pwdStatus,
                pwd: false,
            })
        }

        if (name == 'pwd_2' && pwdStatus.pwd_2 === false) {
            setPwdStatus({
                ...pwdStatus,
                pwd_2: true,
            })
        } else if (name == 'pwd_2' && pwdStatus.pwd_2 === true) {
            setPwdStatus({
                ...pwdStatus,
                pwd_2: false,
            })
        }

        if (name == 'pwd_3' && pwdStatus.pwd_3 === false) {
            setPwdStatus({
                ...pwdStatus,
                pwd_3: true,
            })
        } else if (name == 'pwd_3' && pwdStatus.pwd_3 === true) {
            setPwdStatus({
                ...pwdStatus,
                pwd_3: false,
            })
        }
    }

    const submitForm: FormEventHandler = async event => {
        event.preventDefault()
        const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
        await csrf()

        setErrors([])
        setStatus(null)
        try {
            setLoader(true)
            await axios
                .post(`${baseURL}/api/password`, {
                    current_password: currentPassword,
                    password: password,
                    password_confirmation: passwordConfirmation,
                })
                .then(response => {
                    console.log(response.data.status)

                    setStatus(response.data.status)
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error
                    console.log(error.response.data.errors)
                    setErrors(error.response.data.errors)
                })
            setLoader(false)
            setPassword('')
            setCurrentPassword('')
            setPasswordConfirmation('')
        } catch (e) {
            console.log(e)

            setLoader(false)
        }
    }

    return (
        <section>
            <header>

                <h2 className="text-lg font-bold text-darkGreen">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-500 font-bold ">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={submitForm} className="mt-6 space-y-6">
                {/* Current password */}
                <div className="relative">
                    <Label htmlFor="current_password">Current Password</Label>
                    <Input
                        id="current_password"
                        type={pwdStatus.pwd ? 'text' : 'password'}
                        className="block mt-1 w-full"
                        onChange={event =>
                            setCurrentPassword(event.target.value)
                        }
                        value={currentPassword}
                        required
                        autoComplete="current_password"
                    />
                    <Image
                        onClick={() => changeStatus('pwd')}
                        className={`absolute cursor-pointer right-5 z-10 ${
                            pwdStatus.pwd ? 'top-9' : 'top-10'
                        }`}
                        src={
                            pwdStatus.pwd
                                ? '/assets/images/icons/eye-slash.svg'
                                : '/assets/images/icons/eye.svg'
                        }
                        width={20}
                        height={20}
                        alt="eye.svg"
                    />

                    <InputError
                        messages={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div className="relative">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                        id="password"
                        type={pwdStatus.pwd_2 ? 'text' : 'password'}
                        className="block mt-1 w-full"
                        onChange={event => setPassword(event.target.value)}
                        required
                        value={password}
                        autoComplete="new_password"
                    />
                    <Image
                        onClick={() => changeStatus('pwd_2')}
                        className={`absolute cursor-pointer right-5 z-10 ${
                            pwdStatus.pwd_2 ? 'top-9' : 'top-10'
                        }`}
                        src={
                            pwdStatus.pwd_2
                                ? '/assets/images/icons/eye-slash.svg'
                                : '/assets/images/icons/eye.svg'
                        }
                        width={20}
                        height={20}
                        alt="eye.svg"
                    />

                    <InputError messages={errors.password} className="mt-2" />
                </div>
                <div className="relative">
                    <Label htmlFor="password_confirmation">
                        Confirm Password
                    </Label>
                    <Input
                        id="password_confirmation"
                        type={pwdStatus.pwd_3 ? 'text' : 'password'}
                        className="block mt-1 w-full"
                        onChange={event =>
                            setPasswordConfirmation(event.target.value)
                        }
                        required
                        value={passwordConfirmation}
                        autoComplete="password_confirmation"
                    />

                    <Image
                        onClick={() => changeStatus('pwd_3')}
                        className={`absolute cursor-pointer right-5 z-10 ${
                            pwdStatus.pwd_3 ? 'top-9' : 'top-10'
                        }`}
                        src={
                            pwdStatus.pwd_3
                                ? '/assets/images/icons/eye-slash.svg'
                                : '/assets/images/icons/eye.svg'
                        }
                        width={20}
                        height={20}
                        alt="eye.svg"
                    />

                    <InputError
                        messages={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton>
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
                        Save
                    </PrimaryButton>

                    {/* status === 'password-updated' && (
                        <Transition
                            show={true}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out">
                            <p className="text-sm text-gray-600 ">Saved.</p>
                        </Transition>
                    )*/}
                </div>
            </form>
        </section>
    )
}

export default UpdatePasswordForm
