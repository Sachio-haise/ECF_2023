import 'tailwindcss/tailwind.css'
import React from 'react'
import type { AppProps } from 'next/app'
// custom css
import 'static/slick/custom.css'
// import 'static/flowbite/1.8.0/custom.css'
import 'static/loader/loader.scss'

function App({ Component, pageProps }: AppProps) {
    // suppress useLayoutEffect warnings when running outside a browser
    if (!process.browser) React.useLayoutEffect = React.useEffect

    return (
        <Component {...pageProps} />
    )
}
export default App
