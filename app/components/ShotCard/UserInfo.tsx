"use client";
import { UserSkeleton } from "@/app/[username]/ShotSkeletons";
import useUser from "@/app/hooks/useUser";
import { Avatar, Flex, Link } from "@radix-ui/themes";
import NextLink from "next/link";
import { redirect } from "next/navigation";

const UserInfo = ({ userId }: { userId: string }) => {
  const { data: response, isLoading, isError } = useUser(userId);
  const user = response?.data;

  if (isLoading || !user) return <UserSkeleton />;

  if (isError) return redirect("/not-found");

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
