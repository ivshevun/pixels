import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import React from "react";
import UserTabs from "./UserTabs";
import UserInfo from "./components/UserInfo";

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
      className="h-100% py-16 md:px-8 xl:px-20"
      gap="7"
    >
      <UserInfo user={user} />
      <UserTabs user={user} />
      {children}
    </Flex>
  );
}
