/** @type {import('next').NextConfig} */
const nextConfig = {
    darkMode: 'class',
    experimental: {
        outputStandalone: true,
        serverActions: true,
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
    },
    env: {
        APP_ENV: process.env.APP_ENV,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        API_URL: process.env.API_URL,
    }
}

module.exports = nextConfig
