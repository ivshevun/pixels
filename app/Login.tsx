"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Avatar, Button, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import Link from "next/link";
import Skeleton from "./components/Skeleton";

export const SignUpButton = ({ className }: { className?: string }) => {
  const { user } = useUser();
  if (user) return;

  return (
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button variant="solid" size="3" className={className}>
        <Link href="/api/auth/login">Sign up</Link>
      </Button>
    </motion.button>
  );
};

export default function Login() {
  const { user, error, isLoading } = useUser();
  if (isLoading)
    return (
      <Flex align="center">
        <Skeleton className="rounded-full" width={48} height={48} />
      </Flex>
    );
  if (error) return;

  if (!user) return <SignUpButton className="hidden lg:block" />;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={user.picture!}
          fallback="?"
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text>{user.nickname}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href="/api/auth/logout">Log out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
