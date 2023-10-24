import axios from '@/lib/axios'
import { cartProps, categoryProps, purchaseHistoryProps } from '@/type/type'
import useSWR from 'swr'
import { useAuth } from './auth'

export const useData = () => {
    const { user } = useAuth({ middleware: 'auth' })

    const {
        data: carts,
        mutate,
        error,
    } = useSWR<cartProps[]>('api/carts', () =>
        axios
            .get('/api/carts', {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            })
            .then(res => res.data.data),
    )

    const { data: orderRecord } = useSWR<purchaseHistoryProps[]>(
        'api/purchese-record',
        () =>
            axios
                .get('/api/purchese-record', {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                })
                .then(res => res.data.data),
    )

    const purcheseRecord = async (formData: FormData) => {
        await axios
            .post('/api/purchese-record', formData, {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            })
            .then(res => {
                mutate()
                console.log(res.data)
            })

            .catch(e => {
                console.log(e)
            })
    }
    return {
        purcheseRecord,
        carts,
        orderRecord,
        mutate,
    }
}
