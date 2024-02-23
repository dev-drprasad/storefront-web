import { getBackendURLPrefix } from "@/backend/utils";
import NextAuth from "next-auth";

import GoogleAuthProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleAuthProvider({
      idToken: true,
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (!account || !user) throw new Error("account or user is not defined");
      if (!account.id_token)
        throw new Error("id_token is not defined in account");
      if (!user.email) throw new Error("user doesn't have email");

      const response = await fetch(
        `${getBackendURLPrefix()}/auth/providers/${account.provider}/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ID-Token": account.id_token,
          },
        }
      );

      const json = await response.json();

      account.backendAccessToken = json.token;

      if (response.ok) {
        return true;
      }

      if (response.status !== 404) {
        const messsage = (await response.json())?.message;
        const error = new Error(
          `something went wrong while checking if user exists. code: ${response.status}. message: ${messsage}`
        );
        console.error(error);
        throw error;
      }

      return true;
    },
    async jwt({ token, account, profile, user, session }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.backendAccessToken = account.backendAccessToken;
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        accessToken: token.backendAccessToken,
      };
    },
  },
});
