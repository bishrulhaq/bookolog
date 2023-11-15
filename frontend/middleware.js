import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {

        const session = req?.nextauth?.token

        if (req.nextUrl.pathname === '/')
            return NextResponse.next();
        if (session && req.nextUrl.pathname === '/login')
            return NextResponse.redirect(
                new URL('/club', req.url)
            );
        if (!session && req.nextUrl.pathname === '/club')
            return NextResponse.redirect(
                new URL('/login', req.url)
            );

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: () => true,
        }
    }
)
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}