import { useState, FormEventHandler, useEffect } from 'react'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import axios, { csrf } from '@/lib/axios'
import { useAuth } from '@/hooks/auth'
import { Transition } from '@headlessui/react'
import PrimaryButton from '@/components/PrimaryButton'
import Image from 'next/image'

const UpdateProfileInformationForm = () => {
    const { user,mutate, resendEmailVerification } = useAuth({ middleware: 'auth', redirectIfAuthenticated: '/dashboard' })
    const [name, setName] = useState<any>('')
    const [email, setEmail] = useState<any>('')
    const [avatar, setAavatar] = useState<any>('')
    const [file, setFile] = useState<any>('')
    const [imgPreview, setImgPreview] = useState<any>('')
    const [loader, setLoader] = useState<boolean>(false)
    const [errors, setErrors] = useState<any>([])
    const [status, setStatus] = useState<any>(null)

    useEffect(() => {
        if (user !== undefined) {
            setName(user.name)
            setEmail(user.email)
            setAavatar(user.avatar)
        }
    }, [user])

    const submitForm: FormEventHandler = async event => {
        event.preventDefault()
        setLoader(true)
        const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

        await csrf()

        setErrors([])
        setStatus(null)
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('email', email)
            formData.append('avatar', file)
            axios
                .post(`${baseURL}/api/client-profile`, formData, {
                    headers: {
                        Authorization: 'Bearer ' + user?.token,
                    },
                })
                .then(response => setStatus(response.data.status))
                .catch(error => {
                    console.log(error)

                    if (error.response.status !== 422) throw error

                    setErrors(error.response.data.errors)
                })
            setLoader(false)
            setStatus('profile-updated');
            mutate()
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            if (file) {
                setFile(file)

                const reader = new FileReader()
                reader.onloadend = () => {
                    setImgPreview(reader.result as string)
                }
                reader.readAsDataURL(file)
            }
        }
    }

    return (
        <section>
            <header>

                <h2 className="text-lg font-bold text-darkGreen">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-500 font-bold">
                    Update your account's profile information and email address
                </p>
            </header>

            <form onSubmit={submitForm} className="mt-6 space-y-6">
                {/* Profile */}
                <div>
                    <Label htmlFor="profile">Profile</Label>
                    <div className="w-fit mt-2 relative">
                        <Image
                            className="  border-2 rounded-xl border-[#F5F5F5] min-h-[100px] min-w-[150px]"
                            src={imgPreview ? imgPreview : avatar}
                            width={150}
                            height={150}
                            alt="Profile.png"
                        />

                        <label
                            htmlFor="profile-upload"
                            className="py-1  rounded-br-xl  rounded-bl-xl bg-gray-200 opacity-70 absolute bottom-0 w-full  font-bold text-center text-gray-600 cursor-pointer">
                            Upload
                        </label>
                        <input
                            type="file"
                            className=" hidden"
                            id="profile-upload"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                {/* Name */}
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        className="block mt-1 w-full"
                        onChange={event => setName(event.target.value)}
                        required
                        autoFocus
                    />
                    <InputError messages={errors.email} className="mt-2" />
                </div>
                {/* Email Address */}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />

                    <InputError messages={errors.email} className="mt-2" />
                </div>

                {/*user?.must_verify_email &&*/
                    user?.email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2 text-gray-800 ">
                                Your email address is unverified.
                                <button
                                    className="underline text-sm text-red-500  font-bold hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-offset-0  "
                                    onClick={() =>
                                        resendEmailVerification({
                                            setStatus,
                                            setErrors: () => {},
                                        })
                                    }>
                                    Click here to re-send the verification
                                    email.
                                </button>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 font-bold text-sm text-green-600 ">
                                    A new verification link has been sent to
                                    your email address.
                                </div>
                            )}
                        </div>
                    )}

                <div className="flex items-center gap-4">
                    <PrimaryButton>
                        {loader && (
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    className="inline w-4 h-4 mr-2 text-gray-300 animate-spin  fill-gray-200"
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

                    {/*status === 'profile-updated' && (
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

export default UpdateProfileInformationForm
