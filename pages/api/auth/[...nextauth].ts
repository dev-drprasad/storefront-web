import { getBackendURLPrefix } from "@/backend/utils";
import NextAuth from "next-auth";

import GoogleAuthProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
    confirmPassword: { label: "Confirm Password", type: "password" },
  },
  async authorize(credentials, req) {
    if (!credentials) throw new Error("credentials are not defined");

    const response = await fetch(`${getBackendURLPrefix()}/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        confirmPassword: credentials.confirmPassword,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    const user = json;

    if (!user) {
      // If you return null then an error will be displayed advising the user to check their details.
      return null;
    }

    return user;
  },
});

export default NextAuth({
  providers: [
    GoogleAuthProvider({
      idToken: true,
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    credentialProvider,
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (!account || !user) throw new Error("account or user is not defined");
      if (account.provider === "google") {
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
      } else if (account.provider === "credentials") {
        //@ts-expect-error
        account.backendAccessToken = user.token;
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
