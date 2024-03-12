import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {fetchAuthorize, fetchProviderAuthorize, fetchProviderUser, fetchAuthorizedUser} from "@/utils";
import GoogleProvider from "next-auth/providers/google"
import jwt from 'jsonwebtoken'

const secretKey = process.env.NEXTAUTH_SECRET;

export const authOptions = {
    secret: secretKey,
    session:{
        jwt: true,
        maxAge: 6 * 60 * 60,
    },
    jwt: {
        secret: secretKey,
    },
    authorization: {
        params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
        }
    },
    pages: {
        signIn: '/login',
        signOut: '/auth/signout'
    }, providers: [CredentialsProvider({
        name: "credentials", async authorize(credentials, req) {
            const res = await fetchAuthorize(credentials);

            if (res.status === 200) {
                return await {...res.data};
            } else {
                return null;
            }
        },
    }), GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    })

    ], callbacks: {
        async signIn({user, account, profile}) {

            if (account.provider === "google") {

                const credentials = {
                    email: profile.email,
                    sub: profile.sub,
                    provider: account.provider,
                    first_name: profile.given_name,
                    last_name: profile.family_name,
                    image: profile.picture,
                    country_code: profile.country_code
                }

                const res = await fetchProviderAuthorize(credentials);

                if (res.status == 200) {
                    return true;
                } else {
                    return false;
                }

            }

            return true;
        }, async jwt({token, user, account, session, trigger}) {

            if (account?.provider === 'google' && token?.email) {
                const authUser = await fetchProviderUser({email: token.email, provider: account?.provider});
                if (authUser?.status === 200) {
                    return {...token, ...authUser.data};
                }
            }

            if (trigger === 'update' && session?.user) {
                token.name = session?.user.first_name + ' ' + session?.user?.last_name;
                token.profile_pic = session?.user.image;
                token.country_code = session?.user.country_code;
            }

            return {...token, ...user, ...account};
        }, async session({session, token, user}) {
            session.user = token;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
