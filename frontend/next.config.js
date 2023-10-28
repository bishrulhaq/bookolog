/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputStandalone: true,
  },
  theme: {
    typography: (theme) => ({}),
    extend: {},
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  env: {
    APP_ENV: process.env.APP_ENV,
  }
}

module.exports = nextConfig
