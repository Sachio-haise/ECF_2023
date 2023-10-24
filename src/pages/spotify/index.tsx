import React from 'react'
import axios from 'axios'
import Player, {
    PlayerInterface,
    Track,
    TrackModel,
} from 'react-material-music-player'
import type {
    InferGetServerSidePropsType,
    GetServerSideProps,
    NextPage,
} from 'next'
import { getArtistList, getSpotifyToken } from '@/hooks/spotify-api'
import MusicPlayer from '@/components/Music/MusicPlayer'
interface token {
    acousticness: number
    analysis_url: string
    danceability: number
    duration_ms: number
    energy: number
    id: string
    instrumentalness: number
    key: number
    liveness: number
    loudness: number
    mode: number
    speechiness: number
    tempo: number
    time_signature: number
    track_href: string
    type: string
    uri: string
    valence: number
}

const index: NextPage<token> = ({ uri }) => {
    console.log(uri)
    {/*
        uri
            ? PlayerInterface.setPlaylist([
                  new Track(
                      '1',
                      '/next.svg',
                      '68 Choral',
                      'Bach',
                      'spotify:track:11dFghVXANMlKmJXsNCbNl',
                  ),
              ])
            : ''
            */}
    return (
        <div>
            <div>
                <h1>MUSIC</h1>
            </div>
        </div>
    )
}
export const getServerSideProps: GetServerSideProps<any> = async ({
    req,
}: {
    req: any
}) => {
    try {
        const data: any = await getSpotifyToken()

        const artistList = await getArtistList(data.access_token)

        return {
            props: artistList,
        }
    } catch (error) {
        console.error('Error obtaining token:', error)
        return {
            props: { error },
        }
    }
}
export default index
