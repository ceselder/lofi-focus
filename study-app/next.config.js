/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const nextConfig = withPWA({
  reactStrictMode: false,
  swcMinify: true,
    pwa: {
      dest: 'public'
    }
})
                

module.exports = nextConfig
