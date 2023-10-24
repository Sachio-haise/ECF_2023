import { useAuth } from '@/hooks/auth'
import { useData } from '@/hooks/data'
import { PaymentElement } from '@stripe/react-stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useStripe, useElements } from '@stripe/react-stripe-js'
import { useRouter } from 'next/router'
import { useState } from 'react'
import SecondaryButton from './SecondaryButton'
import { cartProps } from '@/type/type'
import { toast } from 'react-toastify'

interface CheckoutFormProps {
    carts?: cartProps[]
}
const CheckoutForm = ({ carts }: CheckoutFormProps) => {
    const { mutate } = useData()

    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState<any>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const router = useRouter()
    const { user } = useAuth({ middleware: 'auth' })
    const { purcheseRecord } = useData()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }

        setIsProcessing(true)
        const response = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: 'http://localhost:3000/order-history',
            },
            redirect: 'if_required',
        })

        if (
            (response.error && response.error.type === 'card_error') ||
            (response.error && response.error.type === 'validation_error')
        ) {
            setMessage(response.error.message)
        } else if (response.paymentIntent?.id) {
            //display success message or redirect user
            console.log(response.paymentIntent)

            setMessage('Payment Successful!')
            const formData = new FormData()

            formData.append('transaction_id', response.paymentIntent.id),
                formData.append('user_id', String(user?.id)),
                formData.append('currency', response.paymentIntent.currency),
                formData.append('status', response.paymentIntent.status),
                purcheseRecord(formData)
            //  router.push('/order-history')
            mutate()
            toast.success(<p className="font-bold">Payment Success!</p>, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
        }

        setIsProcessing(false)
    }
    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            {stripe && elements && (
                <button
                    className={`inline-flex mt-2 items-center px-4 py-2 font-bold bg-[#5d9c95]  border border-gray-300 rounded-md text-xs text-gray-100  uppercase tracking-widest shadow-sm hover:bg-semiBlue  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 `}
                    disabled={
                        isProcessing ||
                        !stripe ||
                        !elements ||
                        carts?.length === 0
                    }
                    id="submit">
                    <span id="button-text">
                        {isProcessing ? 'Processing ... ' : 'Pay now'}
                    </span>
                </button>
            )}

            {/* Show any error or success messages */}
            {/*message && <div id="payment-message">{message}</div>*/}
        </form>
    )
}

export default CheckoutForm
