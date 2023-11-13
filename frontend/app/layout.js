
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Provider } from "@/components/Provider"
import './globals.css'

export const metadata = {
  title: 'Bookolog',
  description: 'An online destination for discovering, exploring, and finding the perfect books to read.',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <Provider>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
