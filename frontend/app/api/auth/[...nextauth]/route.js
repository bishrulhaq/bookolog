import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {fetchAuthorize, fetchProviderAuthorize, fetchAuthorizedUser} from "@/utils";
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET, pages: {
        signIn: '/login', signOut: '/auth/signout'

    }, session: {
        strategy: "jwt",
    }, providers: [CredentialsProvider({
        name: "credentials", credentials: {
            email: {}, password: {},
        }, async authorize(credentials, req) {
            const res = await fetchAuthorize(credentials);
            if (res.status === 200) {
                return res.data;
            } else {
                return null;
            }
        },
    }), GoogleProvider({
        clientId: process.env.GOOGLE_ID, clientSecret: process.env.GOOGLE_SECRET,
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
                    image: profile.picture
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
                const authUser = await fetchAuthorizedUser({email: token.email});
                if (authUser.status == 200) {
                    return {...token, ...authUser.data};
                }
            }

            if (trigger === 'update' && session?.user) {
                token.name = session?.user.first_name + ' ' + session?.user?.last_name;
            }

            return {...token, ...user , ...account};
        }, async session({session, token}) {
            session.user = token;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
