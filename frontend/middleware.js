import {withAuth} from "next-auth/middleware"
import {NextResponse} from 'next/server';
import jwt from "jsonwebtoken";

export default withAuth(function middleware(req) {

        const session = req?.nextauth?.token

        if (req.nextUrl.pathname === '/')
            return NextResponse.next();
        if (session && req.nextUrl.pathname === '/login')
            return NextResponse.redirect(
                new URL('/lounge', req.url)
            );

        if (!session && req.nextUrl.pathname === '/lounge')
            return NextResponse.redirect(
                new URL('/login', req.url)
            );

        if (!session && req.nextUrl.pathname === '/settings')
            return NextResponse.redirect(
                new URL('/login', req.url)
            );

        return NextResponse.next();
    },

    {
        secret: process.env.NEXTAUTH_SECRET,
        jwt: {
            secret: process.env.NEXTAUTH_SECRET
        },
        callbacks: {
            authorized: () => true,
        }
    })

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)',],
}