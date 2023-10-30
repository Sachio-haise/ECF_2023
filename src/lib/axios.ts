import Axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

const axios = Axios.create({
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN':'XSRF-TOKEN',
         'Access-Control-Allow-Credentials': 'true',
      //  'Access-Control-Allow-Origin':'*',
      //  'Access-Control-Allow-Methods' : 'GET,DELETE,PATCH,POST,PUT',
      //  'Access-Control-Allow-Headers' :'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    },
    baseURL: baseURL,
})

export const csrf = () => axios.get(baseURL + '/sanctum/csrf-cookie')

export default axios
