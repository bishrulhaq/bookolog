
"use client"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Provider } from "@/components/Provider"
import { SessionProvider } from "next-auth/react"
import './globals.css'

export default function RootLayout({ children, session }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className='min-h-screen dark:bg-gray-800 bg-white'>
        <SessionProvider session={session}>
          <Provider>
            <Header />
            {children}
            <Footer />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  )
}
