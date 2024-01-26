"use client";
import { Avatar, Button, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Skeleton from "./components/Skeleton";

export const SignUpButton = ({ className }: { className?: string }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user) return;

  return (
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button
        variant="solid"
        size="3"
        className={className}
        onClick={() => router.push("/auth/signin")}
      >
        Sign In
      </Button>
    </motion.button>
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

  if (status === "unauthenticated")
    return <SignUpButton className="hidden lg:block" />;

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
