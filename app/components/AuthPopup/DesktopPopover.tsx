"use client";
import { Flex, HoverCard, Separator, Text } from "@radix-ui/themes";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { ILink, IUser, PopupLink, UserInfo, UserTrigger } from "./AuthPopover";
import { useRef } from "react";

export default function DesktopPopover({
  user,
  links,
}: {
  user: IUser;
  links: ILink[];
}) {
  const avatarRef = useRef(null);

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Link href={`/${user.username}`}>
          <UserTrigger innerRef={avatarRef} user={user} />
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Content className="flex flex-col items-center gap-4 h-[300px] w-full md:w-[300px] mr-6 mt-6 border text-indigo-950 shadow-md">
        <UserInfo user={user} />
        <Flex
          direction="column"
          gap="2"
          className="text-md font-normal mr-auto pl-8"
        >
          {links.map((link) => (
            <PopupLink key={link.href} label={link.label} href={link.href} />
          ))}
        </Flex>
        <Flex direction="column" width="100%" gap="4" className="pl-8">
          <Separator size="4" />
          <Text
            className="cursor-pointer text-md font-normal hover:text-gray-400"
            onClick={() => signOut()}
          >
            Log out
          </Text>
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}
