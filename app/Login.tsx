"use client";
import { Avatar, Button, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Skeleton from "./components/Skeleton";
import classNames from "classnames";
import Link from "next/link";

export const Auth = ({ className }: { className?: string }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user) return;

  const styles = classNames("flex-col lg:flex-row gap-x-4 gap-y-2", className);

  return (
    <Flex align="center" justify="center" className={styles}>
      <Link href="/auth/sign-in">Log in</Link>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="solid"
          size="3"
          className="bg-indigo-950 text-white rounded-full text-xs px-6"
          onClick={() => router.push("/auth/new-user")}
        >
          Sign Up
        </Button>
      </motion.button>
    </Flex>
  );
};

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <Flex align="center">
        <Skeleton className="rounded-full" width={48} height={48} />
      </Flex>
    );

  if (status === "unauthenticated") return <Auth className="hidden lg:flex" />;

  return (
    status === "authenticated" && (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session?.user?.image!}
            fallback="?"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text>{session.user?.username || session.user.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item onClick={() => signOut()}>
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
  );
}
