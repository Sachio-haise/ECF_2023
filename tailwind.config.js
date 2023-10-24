const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        // "./app/**/*.{js,ts,jsx,tsx}",
         "./pages/**/*.{js,ts,jsx,tsx}",
         "/src/pages/product/**/*.{js,ts,jsx,tsx}",
        // "./components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite-react/**/*.js",
        "./node_modules/flowbite/**/*.js",
        './src/**/*.{js,ts,jsx,tsx}',
        "./public/**/*.html",
    ],
    darkMode: 'media',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
        },
        colors: {
            lightBlue:'#85d3ca',
            semiBlue:'#6bb3aa',
            darkBlue: '#5d9c95',
            darkGreen:'#9bb47e',
            lightGreen:'#4a9b91'
        }
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
}
