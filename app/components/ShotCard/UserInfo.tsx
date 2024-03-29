"use server";
import prisma from "@/prisma/client";
import { Avatar, Flex, Link } from "@radix-ui/themes";
import NextLink from "next/link";
import { redirect } from "next/navigation";

const UserInfo = async ({ userId }: { userId: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return redirect("/not-found");

  return (
    <Flex align="center" gap="3">
      <Avatar src={user?.image || ""} fallback="?" radius="full" size="1" />
      <NextLink href="#" passHref legacyBehavior>
        <Link size="2" className="text-indigo-950 no-underline">
          {user?.username || user?.name || "Anonymous"}
        </Link>
      </NextLink>
    </Flex>
  );
};

export default UserInfo;
