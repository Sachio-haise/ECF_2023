import useSWR from 'swr'
import axios, { csrf } from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Url } from 'next/dist/shared/lib/router/router'
import { UserProps } from '@/type/type'

declare type AuthMiddleware = 'auth' | 'guest'

interface IUseAuth {
    middleware: AuthMiddleware
    redirectIfAuthenticated?: string | undefined
}

interface IApiRequest {
    setErrors: React.Dispatch<React.SetStateAction<never[]>>
    setStatus: React.Dispatch<React.SetStateAction<any | null>>
    [key: string]: any
}


export const useAuth = ({ middleware, redirectIfAuthenticated }: IUseAuth) => {
    const router = useRouter()

    const {
        data: user,
        error,
        mutate,
    } = useSWR<UserProps>('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => {
                localStorage.setItem('%to&an', JSON.stringify(res.data.token))
                return res.data
            })
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const register = async (args: IApiRequest) => {
        const { setErrors, ...props } = args

        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async (args: IApiRequest) => {
        const { setErrors, setStatus, ...props } = args

        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async (args: IApiRequest) => {
        const { setErrors, setStatus, email } = args
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async (args: IApiRequest) => {
        const { setErrors, setStatus, ...props } = args
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = (args: IApiRequest) => {
        const { setStatus } = args

        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push('/dashboard')
        if (user?.email_verified_at === null) {
            router.push('/verify-email')
        }
        if (middleware === 'auth' && error) logout()
    }, [user, error])
    console.log(user)

    return {
        user,
        mutate,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
