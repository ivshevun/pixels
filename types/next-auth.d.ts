import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      username: string | null
    } & DefaultSession["user"]
  }
}