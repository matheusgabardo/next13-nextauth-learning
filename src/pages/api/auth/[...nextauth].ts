import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

type Credentials = {
  username: string;
  password: string;
  login_type: string;
};

type ResponseType = {
  success: boolean;
  data: {
    error?: string;
    token: string;
    name: string;
  };
  message: string;
};
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password, login_type } = credentials as Credentials;
        try {
          const res = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
              accept: "application/problem+json",
              "Content-Type": "application/json-patch+json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
              login_type: login_type,
            }),
          });
          const response: ResponseType = await res.json();

          if (res.ok && response) {
            return {
              name: response.data.name,
              access_token: response.data.token,
            };
          } else {
            throw new Error(response.message);
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      const access_token: any = (user as any)?.access_token;

      if (user) {
        token.user = {
          ...user,
          access_token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      const { access_token, ...tokenData }: any = token.user;

      const user = { ...tokenData, ...session.user };

      return { ...session, user, access_token };
    },
  },
};

export default NextAuth(authOptions);
