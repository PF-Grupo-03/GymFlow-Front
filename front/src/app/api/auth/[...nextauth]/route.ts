import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";



export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks : {
        async redirect({ baseUrl }) {
            return `${baseUrl}/`;
        },
    },
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };