import prisma from "@/prisma/client";
import { Avatar, Flex, Heading, Link } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import authOptions from "../auth/authOptions";
import SmallText from "../auth/components/SmallText";
import TransparentButton from "../components/Buttons/TransparentButton";
import UserTabs from "./UserTabs";
import { User } from "@prisma/client";

interface UsernameParams {
  params: { username: string };
  children: React.ReactNode;
}

export default async function UserLayout({ params, children }: UsernameParams) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
  });

  if (!user) return redirect("/not-found");

  return (
    <Flex
      direction="column"
      width="100%"
      py="7"
      className="h-100% py-16 md:px-8 xl:px-20 overflow-x-hidden"
      gap="7"
    >
      <UserInfo user={user} />
      <UserTabs user={user} />
      {children}
    </Flex>
  );
}

const UserInfo = async ({ user }: { user: User }) => {
  const session = await getServerSession(authOptions);

  return (
    <Flex
      gap="6"
      align="center"
      justify="center"
      direction={{ initial: "column", sm: "row" }}
    >
      <Avatar
        size={{ initial: "7", md: "8" }}
        radius="full"
        src={user.image!}
        fallback="?"
      />
      <Flex
        direction="column"
        gap="1"
        align={{ initial: "center", sm: "start" }}
        className="min-w-48"
      >
        <Heading className="font-semibold text-2xl md:text-4xl">
          {user.username || user.username}
        </Heading>
        <SmallText className="text-sm text-gray-400">{user.email}</SmallText>
        {session?.user.id === user.id && (
          <Link href="/account/settings" className="text-black">
            <TransparentButton className="w-full py-3 px-4">
              Edit profile
            </TransparentButton>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};
