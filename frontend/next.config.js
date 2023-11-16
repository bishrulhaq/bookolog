/** @type {import('next').NextConfig} */
const nextConfig = {
  darkMode: 'class',
  experimental: {
    serverActions: true,
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
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  }
}

module.exports = nextConfig
