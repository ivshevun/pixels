"use client";
import SmallText from "@/app/auth/components/SmallText";
import TransparentButton from "@/app/components/TransparentButton";
import { User } from "@prisma/client";
import { Avatar, Flex, Heading, Skeleton } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserInfo({ user }: { user: User }) {
  const { data: session, status } = useSession();
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
          {user.username || user.name}
        </Heading>
        <SmallText className="text-sm text-gray-400">{user.email}</SmallText>
        {session?.user.id === user.id && (
          <Link href="/account/settings">
            <TransparentButton className="w-full py-3 px-4">
              Edit profile
            </TransparentButton>
          </Link>
        )}
        {status === "loading" && (
          <Skeleton className="w-2/3 py-6 px-4 rounded-full"></Skeleton>
        )}
      </Flex>
    </Flex>
  );
}
