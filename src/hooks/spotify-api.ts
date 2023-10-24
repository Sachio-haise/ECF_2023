import { rejects } from 'assert'
import axios from 'axios'

export interface token {
    access_token: String
    token_type: String
    expires_in: Number
}

export const getSpotifyToken = () => {
    return new Promise(async (resolve, rejects) => {
        const clientId = 'ad680341533d4c2c932e33e7b35ada77'
        const clientSecret = '105e1e9612cd4a7cac71d2979ccbf794'
        const tokenEndpoint = 'https://accounts.spotify.com/api/token'

        const postData = new URLSearchParams()
        postData.append('grant_type', 'client_credentials')
        postData.append('client_id', clientId)
        postData.append('client_secret', clientSecret)

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }

        try {
            const res = await axios.post<any>(tokenEndpoint, postData, config)
            const data = res.data
            resolve(data)
        } catch (error) {
            rejects(error)
        }
    })
}

export const getArtistList = (token: string) => {
    return new Promise(async (resolve, rejects) => {
        const EndPoint =
            'https://api.spotify.com/v1/audio-features/11dFghVXANMlKmJXsNCbNl'
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const res = await axios.get(EndPoint, config)
            const data = res.data
            resolve(data)
        } catch (error) {
            rejects(error)
        }
    })
}
