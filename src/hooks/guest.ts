import axios from '@/lib/axios'
import { categoryProps } from '@/type/type'
import useSWR from 'swr'
import { useAuth } from './auth'

export const useData = () => {
 //   const { user } = useAuth({ middleware: 'guest' })

    const {
        data: categories,
        mutate,
        error,
    } = useSWR<categoryProps[]>('api/categories', () =>
        axios.get('/api/categories').then(res => res.data.data),
    )

    return {
        categories,
        mutate,
    }
}
