"use client";
import { Button, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthPopover from "./components/AuthPopup/AuthPopover";
import Skeleton from "./components/Skeleton";

export const Auth = ({ className }: { className?: string }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user) return;

  const styles = classNames("flex-col lg:flex-row gap-x-4 gap-y-2", className);

  return (
    <Flex align="center" justify="center" className={styles}>
      <Link href="/auth/sign-in">Log in</Link>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="solid"
          size="4"
          className="bg-indigo-950 text-white rounded-full text-base py-6"
          onClick={() => router.push("/auth/new-user")}
        >
          Sign Up
        </Button>
      </motion.div>
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

  return status === "authenticated" && <AuthPopover user={session.user} />;
}
