"use client";
import { User } from "@prisma/client";
import { Flex, Separator } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SortDropdown from "./SortDropdown";

export default function UserTabs({ user }: { user: User }) {
  const { data: session } = useSession();
  const tabs = [
    {
      label: "shots",
      href: `/${user.username}`,
    },
    {
      label: "liked shots",
      href: `/${user.username}/likes`,
    },
    {
      label: "favourites",
      href: `/${user.username}/favourites`,
    },
  ];

  const extendedTabs =
    session?.user.id === user.id
      ? [
          ...tabs,
          {
            label: "Messages",
            href: `/${user.username}/messages`,
          },
        ]
      : tabs;

  const currentTab = usePathname();

  const activeStyles = "bg-yellow-100 rounded-full hover:bg-yellow-200";
  const nonActiveStyles = "hover:text-gray-400";

  return (
    <Flex
      gap="4"
      className=""
      direction="column"
      align={{ initial: "center", md: "start" }}
    >
      <Flex
        gap={{ initial: "0", sm: "4" }}
        align="center"
        justify={{ initial: "center", md: "start" }}
        className="w-full"
      >
        {extendedTabs.map((tab) => (
          <Link
            key={tab.href}
            className={classNames(
              "capitalize text-sm font-semibold px-4 py-2 cursor-pointer transition-colors",
              currentTab === tab.href ? activeStyles : nonActiveStyles
            )}
            href={tab.href}
          >
            {tab.label}
          </Link>
        ))}
        {currentTab === `/${user.username}` && (
          <SortDropdown className="hidden md:flex ml-auto" />
        )}
      </Flex>
      <Separator className="w-full" />
      {currentTab === `/${user.username}` && (
        <SortDropdown className="flex md:hidden" />
      )}
    </Flex>
  );
}
