import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { UsernameParams } from "../page";
import Messages from "./Messages";

export default async function MessagesPage({ params }: UsernameParams) {
  const session = await getServerSession(authOptions);

  if (session?.user.username !== params.username)
    return redirect(`/${params.username}`);

  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  });

  if (!user) return notFound();

  return <Messages />;
}

export const metadata: Metadata = {
  title: "Messages | Pixels",
  description: "Send messages to other designers",
};
