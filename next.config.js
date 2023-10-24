/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  // reactStrictMode: true,
  images: {
    domains: ['harutoecommerce2023.s3.ap-northeast-3.amazonaws.com','lh3.googleusercontent.com'],
},
}

module.exports = nextConfig
