import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchAuthorize } from "@/utils";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/auth/signout'

  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const res = await fetchAuthorize(credentials);
        if (res.status == 200) {
          return res.data;
        } else {
          const error = new Error(res.statusText || "Authentication failed");
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      session.other = user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
