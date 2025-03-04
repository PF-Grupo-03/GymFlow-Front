import { NextAuthOptions } from "next-auth";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } from "./envs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        authorization: {
          params: { prompt: "select_account" }, // Se evita el error de URL inválida
        },
      }),
    ],
    secret: NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token ?? ""; // Asegurar que siempre es string
        }
        return token;
      },
      async session({ session, token }) {
        session.accessToken = typeof token.accessToken === "string" ? token.accessToken : ""; // Asegurar tipo string
        return session;
      },
    },
  };