import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers";
import { fetchLogin } from "@/utils";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        const res = await fetchLogin(credentials);

        if (res.ok) {
          const user = await res.json();
          return Promise.resolve(user);
        } else {
          const error = new Error(res.statusText || "Authentication failed");
          return Promise.reject(error);
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
      return session;
    },
  },
});

export { handler as GET, handler as POST }