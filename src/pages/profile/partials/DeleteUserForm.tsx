import { FormEventHandler, useRef, useState } from 'react'
import DangerButton from '@/components/DangerButton'
import { useRouter } from 'next/router'
import axios, { csrf } from '@/lib/axios'
import Modal from '@/components/Modal'
import Label from '@/components/Label'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import SecondaryButton from '@/components/SecondaryButton'
import { useAuth } from '@/hooks/auth'

const DeleteUserForm = () => {
    const { logout } = useAuth({ middleware: 'auth' })

    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const passwordInput = useRef<HTMLInputElement>()
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<any>([])
    const [status, setStatus] = useState<string | null>(null)

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true)
    }

    const closeModal = () => {
        setConfirmingUserDeletion(false)
    }

    const submitForm: FormEventHandler = async event => {
        event.preventDefault()

        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .delete('/api/profile', { data: { password: password } })
            .then(response => {
                setStatus(response.data.status)

                closeModal()
                logout()
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                passwordInput.current?.focus()

                setErrors(error.response.data.errors)
            })
    }

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-lg font-bold text-darkGreen">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-gray-500 font-bold ">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Delete Account
            </DangerButton>

            <p className='text-center  relative before:contents[""] before:top-3 before:left-0 before:absolute before:h-[0.5px] before:w-[47%]  before:bg-gray-400 after:contents[""] after:top-3 after:right-0 after:absolute after:h-[0.5px] after:w-[47%]   after:bg-gray-400 font-bold'>
                OR
            </p>
            <SecondaryButton onClick={() => logout()}>Logout</SecondaryButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={submitForm} className="p-6">
                    <h2 className="text-lg text-gray-900 font-bold">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 font-bold">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>

                    <div className="mt-6">
                        <Label htmlFor="password" className="sr-only" />

                        <Input
                            id="password"
                            type="password"
                            ref={passwordInput}
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            messages={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ml-3">
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    )
}

export default DeleteUserForm
