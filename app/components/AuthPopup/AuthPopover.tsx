import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Dispatch, RefObject, SetStateAction } from "react";
import DesktopPopover from "./DesktopPopover";
import MobilePopover from "./MobilePopover";

export interface IUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
}

export interface ILink {
  label: string;
  href: string;
}

const links: ILink[] = [
  {
    label: "Upload design work",
    href: "/uploads/new",
  },
  {
    label: "Settings",
    href: "/account/settings",
  },
];

export default function AuthPopover({ user }: { user: IUser }) {
  return (
    <>
      <Box
        display={{ initial: "none", md: "block" }}
        className="text-indigo-950"
      >
        <DesktopPopover user={user} links={links} /> {/* desktop version */}
      </Box>
      <Box
        display={{ initial: "block", md: "none" }}
        className="text-indigo-950"
      >
        <MobilePopover user={user} links={links} /> {/* mobile version */}
      </Box>
    </>
  );
}

// reusable components

interface IUserTriggerProps {
  user: IUser;
  innerRef: RefObject<HTMLImageElement>;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export const UserTrigger = ({ user, innerRef, setOpen }: IUserTriggerProps) => {
  return (
    <Avatar
      src={user.image!}
      fallback="?"
      radius="full"
      className="cursor-pointer"
      referrerPolicy="no-referrer"
      size="4"
      ref={innerRef}
      onClick={() => {
        if (setOpen) setOpen((prevOpen) => !prevOpen);
      }}
    />
  );
};

export const UserInfo = ({ user }: { user: IUser }) => {
  return (
    <Link href={`/${user.username}`}>
      <Flex
        direction="column"
        align="center"
        className="hover:bg-white hover:text-black"
        gap="3"
      >
        <Avatar size="6" radius="full" src={user.image!} fallback="?" />
        <Text>{user.username || user.name || user.email}</Text>
      </Flex>
    </Link>
  );
};

export const PopupLink = ({ label, href }: ILink) => {
  return (
    <Link className="hover:text-gray-400" href={href}>
      {label}
    </Link>
  );
};
