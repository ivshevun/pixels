import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: {
          label: "Email or Username",
          type: "text",
          placeholder: "Login",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, request) {
        if (!credentials?.login || !credentials.password) return null;

        // arrange global user variable to assign it in two places
        let user;

        // check if login is email and find a user by email
        if (credentials.login.includes("@")) {
          user = await prisma.user.findUnique({
            where: { email: credentials.login },
          });
        }

        // find user by username if its not an email
        else {
          user = await prisma.user.findUnique({
            where: {
              username: credentials.login,
            },
          });
        }

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        if (!passwordsMatch) return null;

        return user; // success
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;

      return token;
    },
    async session({ session, token }) {
      if (token && token.user) session.user = token.user as User;

      return session;
    },
  },
  theme: {
    colorScheme: "light",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};

export default authOptions;
