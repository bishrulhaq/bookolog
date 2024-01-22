"use client"
import {Provider} from "@/components/Provider"
import {SessionProvider} from "next-auth/react"
import './globals.css'
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import {usePathname} from 'next/navigation'
import GenreCarousel from "@/components/GenreCarousel";

export default function RootLayout({children, session}) {

    const currentRoute = usePathname();

    function isNotExcludedRoute(route) {
        return !['/login', '/about', '/lounge', '/register', '/settings', '/user/test'].includes(route);
    }

    return (
        <html lang="en" suppressHydrationWarning>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <body className='min-h-screen dark:bg-gray-800 bg-white duration-300'>
        <SessionProvider session={session}>
            <Provider>
                <NavBar/>
                <SearchBar/>
                {isNotExcludedRoute(currentRoute) && <GenreCarousel className="mx-auto max-w-screen-xl"/>}
                {children}
                <Footer/>
            </Provider>
        </SessionProvider>
        </body>
        </html>
    )
}
