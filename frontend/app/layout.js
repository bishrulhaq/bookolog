import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bookolog',
  description: 'An online destination for discovering, exploring, and finding the perfect books to read.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={`${inter.className} dark:bg-gray-800`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
